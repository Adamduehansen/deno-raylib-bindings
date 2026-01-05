import { RaylibColor } from "@adamduehansen/raylib-bindings/r-core";
import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import { Entity, vec } from "@adamduehansen/engine";
import { Scene } from "../engine/scene.ts";

const SANDY_BROWN: RaylibColor = [244, 164, 96, 255];

export default class Ground extends Entity {
  override initialize(scene: Scene): void {
    this.pos = vec(0, 158);
    this.width = scene.game?.width ?? 0;
    this.height = scene.game?.height ?? 0;
  }

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
