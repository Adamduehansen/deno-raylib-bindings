import {
  Black,
  getFrameTime,
  getScreenHeight,
  getScreenWidth,
  isKeyDown,
  KeyA,
  KeyD,
  RaylibVector,
  Red,
} from "@adamduehansen/raylib-bindings/r-core";
import { vec } from "./vector.ts";
import {
  drawCircleV,
  drawRectangleRec,
} from "@adamduehansen/raylib-bindings/r-shapes";

abstract class Entity {
  pos: RaylibVector = vec(0, 0);

  abstract update(): void;
  abstract draw(): void;
}

// Ball
// ----------------------------------------------------------------------------

export class Ball extends Entity {
  constructor() {
    super();
  }

  override update(): void {
  }

  override draw(): void {
    drawCircleV({
      center: this.pos,
      color: Red,
      radius: 8,
    });
  }
}

// Paddle
// ----------------------------------------------------------------------------

const PADDLE_SPEED = 100;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;

export class Paddle extends Entity {
  constructor() {
    super();

    this.pos = vec(
      getScreenWidth() / 2,
      getScreenHeight() - getScreenHeight() / 10,
    );
  }

  override update(): void {
    if (isKeyDown(KeyA)) {
      this.pos.x -= PADDLE_SPEED * 6 * getFrameTime();
    } else if (isKeyDown(KeyD)) {
      this.pos.x += PADDLE_SPEED * 6 * getFrameTime();
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
