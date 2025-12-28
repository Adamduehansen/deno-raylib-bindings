import {
  checkCollisionCircleRec,
  drawRectangleRec,
} from "@adamduehansen/raylib-bindings/r-shapes";
import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";
import { CircleBody, Entity, RectangleBody } from "@adamduehansen/engine";
import { Scene } from "../../engine/scene.ts";

const BRICK_WIDTH = 50;
const BRICK_HEIGHT = 20;

export default class Brick extends Entity {
  constructor() {
    super();

    this.name = `brick-${this.id}`;
    this.body = new RectangleBody(this, BRICK_WIDTH, BRICK_HEIGHT);
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

  override update(scene: Scene): void {
    super.update(scene);

    // Check for collision with ball
    const ball = scene.entities.find("ball");
    const ballBody = ball?.body instanceof CircleBody ? ball.body : undefined;
    const thisBody = this.body instanceof RectangleBody ? this.body : undefined;

    if (
      ball !== undefined && ballBody !== undefined && thisBody !== undefined &&
      checkCollisionCircleRec(ball.pos, ballBody.radius, thisBody.getBounds())
    ) {
      scene.events.emit("brick_destroyed", this.id);
    }
  }
}
