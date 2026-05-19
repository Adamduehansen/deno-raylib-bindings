import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Sprite } from "./sprite.ts";
import { Scene } from "./scene.ts";

export interface EntityArgs {
  position: RaylibVector;
  sprite?: Sprite;
  name?: string;
  z?: number;
}

export class Entity {
  static CURRENT_MAX_ID = 1;

  readonly id = Entity.CURRENT_MAX_ID++;

  readonly name?: string;

  position: RaylibVector;
  z: number;
  sprite?: Sprite;
  scene?: Scene;

  flipHorizontal = false;
  flipVertical = false;

  constructor(args: EntityArgs) {
    this.sprite = args.sprite;
    this.position = args.position;
    this.name = args.name;
    this.z = args.z ?? 1;
  }

  /**
   * Called on each frame. Override this function to update the entity.
   */
  update(): void {}
}
