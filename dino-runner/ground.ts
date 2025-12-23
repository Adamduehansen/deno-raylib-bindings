import { Color } from "@adamduehansen/raylib-bindings/r-core";
import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import { Entity } from "@adamduehansen/engine";

const SANDY_BROWN: Color = [244, 164, 96, 255];

export default class Ground extends Entity {
  override draw(): void {
    drawRectangleRec({
      color: SANDY_BROWN,
      rectangle: {
        x: this.pos.x,
        y: this.pos.y,
        width: this.width,
        height: this.height,
      },
    });
  }
}
