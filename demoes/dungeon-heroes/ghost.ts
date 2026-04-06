import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "./core/entity.ts";
import { Sprite } from "./core/sprite.ts";
import { Resources } from "./resources.ts";

export class Ghost extends Entity {
  constructor(position: RaylibVector) {
    super({
      sprite: new Sprite(Resources.ghost.texture!),
      position: position,
    });
  }
}
