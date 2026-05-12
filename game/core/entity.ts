import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Sprite } from "./sprite.ts";
import { vector2Scale } from "@adamduehansen/raylib-bindings/r-math";

export interface EntityArgs {
  sprite: Sprite;
  position: RaylibVector;
}

export class Entity {
  static CURRENT_MAX_ID = 1;

  readonly id = Entity.CURRENT_MAX_ID++;
  position: RaylibVector;
  sprite: Sprite;

  flipHorizontal = false;
  flipVertical = false;

  get worldPosition(): RaylibVector {
    return vector2Scale(this.position, this.sprite.width);
  }

  constructor({ sprite, position }: EntityArgs) {
    this.sprite = sprite;
    this.position = position;
  }

  /**
   * Called on each frame. Override this function to update the entity.
   */
  update(): void {}
}
