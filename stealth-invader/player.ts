import { isKeyDown, KeyA, KeyD } from "@adamduehansen/raylib-bindings/r-core";
import { Entity, RectangleBody, Sprite } from "@adamduehansen/saga";
import { Resources } from "./resources.ts";

const RotationSpeed = 5;

export class Player extends Entity {
  constructor() {
    super({
      position: { x: 100, y: 100 },
    });
    this.body = new RectangleBody(99, 75);
  }

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
