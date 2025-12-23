import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import {
  Black,
  DarkGreen,
  Green,
  isKeyPressed,
  KeySpace,
} from "@adamduehansen/raylib-bindings/r-core";
import { Entity, RectangleBody } from "@adamduehansen/engine";

const JUMP_STRENGTH = -400;
const GRAVITY = 15;
const GROUND_Y = 150;

export default class Dino extends Entity {
  isJumping = false;

  constructor() {
    super();

    this.width = 40;
    this.height = 40;
    this.body = new RectangleBody(this, this.width, this.height);
    this.body.color = Black;
  }

  jump(): void {
    if (this.isJumping === true) {
      return;
    }

    this.vel.y = JUMP_STRENGTH;
    this.isJumping = true;
  }

  override update(): void {
    super.update();

    this.vel.y += GRAVITY;
    if (this.pos.y > GROUND_Y) {
      this.pos.y = GROUND_Y;
      this.vel.y = 0;
      this.isJumping = false;
    }

    if (isKeyPressed(KeySpace)) {
      this.jump();
    }
  }

  override draw(): void {
    const centerX = this.pos.x - this.width / 2;
    const centerY = this.pos.y - this.height / 2;
    drawRectangleRec({
      color: Green,
      rectangle: {
        x: centerX,
        y: centerY,
        width: this.width,
        height: this.height,
      },
    });
    drawRectangleRec({
      color: DarkGreen,
      rectangle: {
        x: centerX + 25,
        y: centerY + 8,
        width: 4,
        height: 4,
      },
    });
    drawRectangleRec({
      color: DarkGreen,
      rectangle: {
        x: centerX + 30,
        y: centerY + 20,
        width: 8,
        height: 2,
      },
    });

    if (this.isJumping === false) {
      drawRectangleRec({
        color: Green,
        rectangle: {
          x: centerX + 10,
          y: centerY + 40,
          width: 6,
          height: 8,
        },
      });

      drawRectangleRec({
        color: Green,
        rectangle: {
          x: centerX + 24,
          y: centerY + 40,
          width: 6,
          height: 8,
        },
      });
    }
  }
}
