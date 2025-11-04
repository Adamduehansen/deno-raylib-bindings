import { Scene } from "@src/scene.ts";
import {
  DarkGray,
  getScreenHeight,
  Gray,
  isKeyPressed,
  KeySpace,
} from "../../raylib-bindings.ts";
import { Ball } from "./ball.ts";
import { Paddle } from "./paddle.ts";
import { Brick } from "./brick.ts";
import { vec } from "@src/math.ts";
import { Life } from "./life.ts";

export class GameScene extends Scene {
  lifes = 5;

  constructor() {
    super();

    const paddle = new Paddle();
    this.entityManager.add(paddle);
    this.entityManager.add(new Ball(paddle));

    let colorIndex = 0;
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 20; columnIndex++) {
        this.entityManager.add(
          new Brick({
            pos: vec(40 * columnIndex + Brick.size / 2, 40 * rowIndex + 40),
            color: rowIndex % 2 === 0
              ? columnIndex % 2 === 0 ? Gray : DarkGray
              : columnIndex % 2 === 0
              ? DarkGray
              : Gray,
          }),
        );
        colorIndex += 1;
      }
    }

    for (let index = 0; index < this.lifes; index++) {
      this.entityManager.add(
        new Life({
          pos: {
            x: index * 50 + 45,
            y: getScreenHeight() - 20,
          },
        }),
      );
    }
  }

  override update(): void {
    super.update();

    if (isKeyPressed(KeySpace)) {
      this.eventEmitter.emit("activate");
    }
  }
}
