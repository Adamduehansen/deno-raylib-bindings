import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import {
  Black,
  getScreenHeight,
  getScreenWidth,
  isKeyDown,
  KeyA,
  KeyD,
} from "@adamduehansen/raylib-bindings/r-core";
import { Entity, RectangleBody, Scene, vec } from "@adamduehansen/engine";

const PADDLE_SPEED = 600;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;

export default class Paddle extends Entity {
  constructor() {
    super();

    this.name = "paddle";
    this.body = new RectangleBody(this, PADDLE_WIDTH, PADDLE_HEIGHT);
  }

  override onInitialize(scene: Scene): void {
    super.onInitialize(scene);

    scene.events.on("activated", () => {
      this.pos = vec(
        getScreenWidth() / 2,
        getScreenHeight() - getScreenHeight() / 10,
      );
    });
  }

  override onUpdate(scene: Scene): void {
    super.onUpdate(scene);
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

  override onDraw(): void {
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
