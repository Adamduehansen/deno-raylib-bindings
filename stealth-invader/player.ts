import { isKeyDown, KeyA, KeyD } from "@adamduehansen/raylib-bindings/r-core";
import { Entity, Sprite } from "@adamduehansen/saga";
import { Resources } from "./resources.ts";

const RotationSpeed = 5;

export class Player extends Entity {
  override init(): void {
    this.sprite = new Sprite(Resources.spaceship.texture!);
  }

  override update(): void {
    if (isKeyDown(KeyA)) {
      this.rotation -= RotationSpeed;
    } else if (isKeyDown(KeyD)) {
      this.rotation += RotationSpeed;
    }
  }
}
