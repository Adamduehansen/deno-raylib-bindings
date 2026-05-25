import { White } from "@adamduehansen/raylib-bindings/r-core";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import type { Entity } from "./entity.ts";

export function drawEntity(entity: Entity) {
  if (entity.sprite === undefined) {
    return;
  }

  const { x, y, width, height, texture } = entity.sprite;

  drawTexturePro({
    texture: texture,
    source: {
      x: x,
      y: y,
      height: height,
      width: entity.flipHorizontal === false ? width : -width,
    },
    dest: {
      x: entity.position.x,
      y: entity.position.y,
      height: height,
      width: width,
    },
    rotation: 0,
    origin: {
      x: width / 2,
      y: height / 2,
    },
    tint: White,
  });
}
