import { Entity } from "@adamduehansen/engine";
import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";

export default class Life extends Entity {
  constructor() {
    super();
    this.name = "LifeBlock";
    this.height = 20;
    this.width = 30;
  }

  override onDraw(): void {
    drawRectangleRec({
      color: DarkGray,
      rectangle: {
        ...this.pos,
        height: this.height,
        width: this.width,
      },
    });
  }
}
