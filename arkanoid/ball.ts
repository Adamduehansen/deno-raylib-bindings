import { drawCircleV } from "@adamduehansen/raylib-bindings/r-shapes";
import Entity from "./entity.ts";
import { Red } from "@adamduehansen/raylib-bindings/r-core";

export default class Ball extends Entity {
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
