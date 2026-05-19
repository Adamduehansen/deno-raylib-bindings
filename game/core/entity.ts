import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Sprite } from "./sprite.ts";
import { Scene } from "./scene.ts";

export interface EntityArgs {
  sprite?: Sprite;
  name?: string;
  position: RaylibVector;
}

export class Entity {
  static CURRENT_MAX_ID = 1;

  readonly id = Entity.CURRENT_MAX_ID++;

  readonly name?: string;

  position: RaylibVector;
  sprite?: Sprite;
  scene?: Scene;

  flipHorizontal = false;
  flipVertical = false;

  constructor({ sprite, position, name }: EntityArgs) {
    this.sprite = sprite;
    this.position = position;
    this.name = name;
  }

  /**
   * Called on each frame. Override this function to update the entity.
   */
  update(): void {}
}
