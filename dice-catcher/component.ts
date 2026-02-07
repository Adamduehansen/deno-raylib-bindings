import { drawTexture } from "@adamduehansen/raylib-bindings/r-textures";
import { RaylibTexture, White } from "@adamduehansen/raylib-bindings/r-core";

export abstract class Component {}

export class PositionComponent implements Component {
  constructor(public x: number = 0, public y: number = 0) {}
}

export class VelocityComponent implements Component {
  constructor(public dx: number = 0, public dy: number = 0) {}
}

export class GraphicComponent implements Component {
  constructor(readonly texture: RaylibTexture) {}

  draw(pos: { x: number; y: number }): void {
    drawTexture({
      texture: this.texture,
      color: White,
      x: pos.x,
      y: pos.y,
    });
  }
}
