import { Entity } from "@src/entity.ts";
import { drawRectangleRec, LightGray } from "../../raylib-bindings.ts";
import { Vector } from "@src/math.ts";

const WIDTH = 40;
const HEIGHT = 10;

interface Args {
  pos: Vector;
}

export class Life extends Entity {
  constructor({ pos }: Args) {
    super({
      pos: pos,
      height: HEIGHT,
      width: WIDTH,
    });
  }

  override render(): void {
    drawRectangleRec({
      x: this.pos.x - WIDTH / 2,
      y: this.pos.y - HEIGHT / 2,
      width: this.width,
      height: this.height,
    }, LightGray);
  }
}
