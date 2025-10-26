import { Entity } from "@src/entity.ts";
import { Vector } from "@src/math.ts";
import {
  Color,
  DarkGray,
  drawRectangleRec,
  Gray,
} from "../../raylib-bindings.ts";

interface BrickArgs {
  pos: Vector;
  color: typeof Gray | typeof DarkGray;
}

export class Brick extends Entity {
  readonly color: Color;

  constructor({ pos, color }: BrickArgs) {
    super({
      pos: pos,
      height: 40,
      width: 40,
    });
    this.color = color;
  }

  override render(): void {
    drawRectangleRec(this.body, this.color);
  }
}
