import { Entity } from "@src/entity.ts";
import {
  Black,
  drawRectangle,
  isKeyDown,
  KeyA,
  KeyD,
} from "../../raylib-bindings.ts";
import { Body } from "@src/physics.ts";
import { vec } from "@src/math.ts";

export class Paddle extends Entity {
  static width = 80;
  static height = 20;
  static speed = 5;

  #paused = false;

  constructor() {
    super({
      pos: vec(0, 0),
      width: Paddle.width,
      height: Paddle.height,
      name: "paddle",
      body: Body.rectangle(Paddle.width, Paddle.height),
    });
  }

  override initialize(): void {
    this.pos = vec(
      this.scene!.game!.width / 2,
      Math.floor(this.scene!.game!.height * 7 / 8),
    );

    this.scene?.eventEmitter.on("pause", (paused: boolean) => {
      this.#paused = paused;
    });
  }

  override update(): void {
    // Pre update
    if (this.#paused) {
      return;
    }

    super.update();

    // Post update

    if (isKeyDown(KeyD)) {
      this.velocity.x = Paddle.speed;
    } else if (isKeyDown(KeyA)) {
      this.velocity.x = -Paddle.speed;
    } else {
      this.velocity.x = 0;
    }

    if (this.pos.x < 0) {
      this.pos.x = 0;
    }

    if (this.pos.x > this.scene!.game!.width) {
      this.pos.x = this.scene!.game!.width;
    }
  }

  override render(): void {
    drawRectangle({
      color: Black,
      height: Paddle.height,
      width: Paddle.width,
      posX: this.pos.x - Paddle.width / 2,
      posY: this.pos.y - Paddle.height / 2,
    });
  }
}
