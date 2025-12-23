import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import { Entity, RectangleBody } from "@adamduehansen/engine";
import { Black, Green } from "@adamduehansen/raylib-bindings/r-core";

export default class Obstacle extends Entity {
  constructor() {
    super();

    this.width = 20;
    this.height = 40;
    this.body = new RectangleBody(this, this.width, this.height);
    this.body.color = Black;
  }

  override update(): void {
    super.update();

    this.vel.x = -250;
  }

  override draw(): void {
    const centerX = this.pos.x - this.width / 2;
    const centerY = this.pos.y - this.height / 2;

    drawRectangleRec({
      color: Green,
      rectangle: {
        x: centerX,
        y: centerY,
        height: this.height,
        width: this.width,
      },
    });
  }
}
