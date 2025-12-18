import {
  Black,
  DarkGray,
  getFrameTime,
  getScreenHeight,
  getScreenWidth,
  Green,
  isKeyDown,
  KeyA,
  KeyD,
  RaylibVector,
  Red,
} from "@adamduehansen/raylib-bindings/r-core";
import { vec } from "./vector.ts";
import {
  checkCollisionCircleRec,
  drawCircleLinesV,
  drawCircleV,
  drawRectangleLinesEx,
  drawRectangleRec,
  RaylibRectangle,
} from "@adamduehansen/raylib-bindings/r-shapes";
import { GameScene } from "./scene.ts";

abstract class Entity {
  pos: RaylibVector = vec(0, 0);
  vel: RaylibVector = vec(0, 0);

  update(_scene: GameScene): void {
    this.pos.x += this.vel.x * getFrameTime();
    this.pos.y += this.vel.y * getFrameTime();
  }

  abstract initialize(scene: GameScene): void;
  abstract draw(): void;
}

abstract class Body {
  constructor(protected readonly entity: Entity) {}

  update(): void {}

  abstract draw(): void;
}

class CircleBody extends Body {
  readonly radius: number;

  constructor(entity: Entity, radius: number) {
    super(entity);
    this.radius = radius;
  }

  override draw(): void {
    drawCircleLinesV({
      center: this.entity.pos,
      color: Green,
      radius: this.radius,
    });
  }
}

class RectangleBody extends Body {
  private readonly _width: number;
  private readonly _height: number;

  constructor(entity: Entity, width: number, height: number) {
    super(entity);
    this._height = height;
    this._width = width;
  }

  getBounds(): RaylibRectangle {
    return {
      x: this.entity.pos.x - this._width / 2,
      y: this.entity.pos.y - this._height / 2,
      width: this._width,
      height: this._height,
    };
  }

  override draw(): void {
    drawRectangleLinesEx({
      color: Green,
      lineThick: 1,
      rec: {
        height: this._height,
        width: this._width,
        x: this.entity.pos.x - this._width / 2,
        y: this.entity.pos.y - this._height / 2,
      },
    });
  }
}

// Ball
// ----------------------------------------------------------------------------

const BALL_RADIUS = 8;
const INITIAL_BALL_VECTOR = vec(0, -250);

export class Ball extends Entity {
  private _active: boolean = false;

  readonly body = new CircleBody(this, BALL_RADIUS);

  override initialize(scene: GameScene): void {
    scene.events.on("activate", () => {
      this.vel = INITIAL_BALL_VECTOR;
      this._active = true;
    });

    this.pos = vec(getScreenWidth() / 2, 100);
  }

  override update(scene: GameScene): void {
    super.update(scene);

    if (this._active === false) {
      this.pos = vec(scene.paddle.pos.x, scene.paddle.pos.y - 25);
    }

    // Check collision with borders.
    if (this.pos.y < BALL_RADIUS) {
      this.vel.y *= -1;
    } else if (
      this.pos.x < BALL_RADIUS || this.pos.x > getScreenWidth() - BALL_RADIUS
    ) {
      this.vel.x *= -1;
    }

    // Check collision with paddle
    if (
      checkCollisionCircleRec(
        this.pos,
        BALL_RADIUS,
        scene.paddle.body.getBounds(),
      )
    ) {
      this.vel.y *= -1;
      this.vel.x = (this.pos.x - scene.paddle.pos.x) / 5 * 25;
    }

    // Check collision with brick
    for (const brick of scene.bricks) {
      if (
        checkCollisionCircleRec(this.pos, BALL_RADIUS, brick.body.getBounds())
      ) {
        this.vel.y *= -1;
      }
    }
  }

  override draw(): void {
    drawCircleV({
      center: this.pos,
      color: Red,
      radius: BALL_RADIUS,
    });
  }
}

// Paddle
// ----------------------------------------------------------------------------

const PADDLE_SPEED = 600;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;

export class Paddle extends Entity {
  readonly body = new RectangleBody(this, PADDLE_WIDTH, PADDLE_HEIGHT);

  override initialize(_scene: GameScene): void {
    this.pos = vec(
      getScreenWidth() / 2,
      getScreenHeight() - getScreenHeight() / 10,
    );
  }

  override update(scene: GameScene): void {
    super.update(scene);
    if (isKeyDown(KeyA)) {
      this.vel.x = -PADDLE_SPEED;
    } else if (isKeyDown(KeyD)) {
      this.vel.x = PADDLE_SPEED;
    } else {
      this.vel.x = 0;
    }

    if (this.pos.x - PADDLE_WIDTH / 2 < 0) {
      this.pos.x = PADDLE_WIDTH / 2;
    }

    if (this.pos.x + PADDLE_WIDTH / 2 > getScreenWidth()) {
      this.pos.x = getScreenWidth() - PADDLE_WIDTH / 2;
    }
  }

  override draw(): void {
    drawRectangleRec({
      color: Black,
      rectangle: {
        x: this.pos.x - PADDLE_WIDTH / 2,
        y: this.pos.y - PADDLE_HEIGHT / 2,
        height: PADDLE_HEIGHT,
        width: PADDLE_WIDTH,
      },
    });
  }
}

// Paddle
// ----------------------------------------------------------------------------

const BRICK_WIDTH = 50;
const BRICK_HEIGHT = 20;

let brickId = 0;

export class Brick extends Entity {
  readonly id = brickId++;
  readonly body = new RectangleBody(this, BRICK_WIDTH, BRICK_HEIGHT);

  override initialize(_scene: GameScene): void {}

  override update(scene: GameScene): void {
    super.update(scene);

    // Check for collision with ball
    if (
      checkCollisionCircleRec(
        scene.ball.pos,
        scene.ball.body.radius,
        this.body.getBounds(),
      )
    ) {
      scene.events.emit("brick_destroyed", {
        id: this.id,
      });
    }
  }

  override draw(): void {
    drawRectangleRec({
      color: DarkGray,
      rectangle: {
        x: this.pos.x - BRICK_WIDTH / 2,
        y: this.pos.y - BRICK_HEIGHT / 2,
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
      },
    });
  }
}
