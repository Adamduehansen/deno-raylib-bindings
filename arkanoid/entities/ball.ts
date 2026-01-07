import {
  CircleBody,
  Entity,
  RectangleBody,
  Scene,
  vec,
} from "@adamduehansen/engine";
import { getScreenWidth, Red } from "@adamduehansen/raylib-bindings/r-core";
import {
  checkCollisionCircleRec,
  drawCircleV,
} from "@adamduehansen/raylib-bindings/r-shapes";

const BALL_RADIUS = 8;

export default class Ball extends Entity {
  private _active = false;

  constructor() {
    super();

    this.name = "ball";
    this.body = new CircleBody(this, BALL_RADIUS);
  }

  override onInitialize(scene: Scene): void {
    scene.events.on("activate", () => {
      this.vel = vec(0, -250);
      this._active = true;
    });

    scene.events.on("disabled", () => {
      this._active = false;
    });

    scene.events.on("life_lost", () => {
      this._active = false;
    });
  }

  override onUpdate(scene: Scene): void {
    super.onUpdate(scene);

    // Get a reference to the paddle.
    const paddle = scene.entities.find("paddle");
    if (paddle?.body instanceof RectangleBody === false) {
      return;
    }

    // Keep ball fixed to the paddle when game is not active.
    if (this._active === false) {
      this.pos = vec(paddle.pos.x, paddle.pos.y - 50);
    }

    // Check collision with borders.
    if (this.pos.y < BALL_RADIUS) {
      this.vel.y *= -1;
    } else if (
      this.pos.x < BALL_RADIUS || this.pos.x > getScreenWidth() - BALL_RADIUS
    ) {
      this.vel.x *= -1;
    }

    // Check if ball fell below the paddle.
    if (this.pos.y > scene.game.height) {
      scene.events.emit("life_lost");
      this.vel = vec(0, 0);
    }

    // Check collision with paddle
    if (
      checkCollisionCircleRec(
        this.pos,
        BALL_RADIUS,
        paddle.body!.getBounds(),
      )
    ) {
      this.vel.y *= -1;
      this.vel.x = (this.pos.x - paddle.pos.x) / 5 * 25;
    }

    // Check collision with brick
    const bricks = scene.entities.filter((entity) =>
      entity.name !== undefined && entity.name?.includes("brick")
    );
    for (const brick of bricks) {
      const brickBody = brick.body instanceof RectangleBody
        ? brick.body
        : undefined;
      const brickBounds = brickBody?.getBounds();
      if (
        brickBounds !== undefined &&
        checkCollisionCircleRec(this.pos, BALL_RADIUS, brickBounds)
      ) {
        // Change velocity according to which side is hit.
        // Left side
        if (
          this.pos.x < brick.pos.x &&
          this.pos.y < brick.pos.y + brickBounds.height / 2 &&
          this.pos.y > brick.pos.y - brickBounds.height / 2
        ) {
          this.vel.x *= -1;
        } // Right side
        else if (
          this.pos.x > brick.pos.x &&
          this.pos.y < brick.pos.y + brickBounds.height / 2 &&
          this.pos.y > brick.pos.y - brickBounds.height / 2
        ) {
          this.vel.x *= -1;
        } // Top side
        else if (
          this.pos.y < brick.pos.y &&
          this.pos.x < brick.pos.x + brickBounds.width / 2 &&
          this.pos.x > brick.pos.x - brickBounds.width / 2
        ) {
          this.vel.y *= -1;
        } // Bottom side
        else if (
          this.pos.y > brick.pos.y &&
          this.pos.x < brick.pos.x + brickBounds.width / 2 &&
          this.pos.x > brick.pos.x - brickBounds.width / 2
        ) {
          this.vel.y *= -1;
        }
      }
    }
  }

  override onDraw(): void {
    drawCircleV({
      center: this.pos,
      color: Red,
      radius: BALL_RADIUS,
    });
  }
}
