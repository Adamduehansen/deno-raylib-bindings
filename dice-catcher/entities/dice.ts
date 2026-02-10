import { getScreenWidth } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "../ecs/component-manager.ts";
import {
  GraphicComponent,
  RotationComponent,
  TransformComponent,
  VelocityComponent,
} from "../ecs/component.ts";
import Entity from "../ecs/entity.ts";
import Resources from "../resources.ts";

const ROTATION_SPEED = 3;

export default class Dice extends Entity {
  constructor(id: number, componentManager: ComponentManager) {
    super(id, componentManager);
    const spawnX = Math.floor(Math.random() * getScreenWidth());

    this.addComponent(new TransformComponent(spawnX, -80));
    this.addComponent(new VelocityComponent(0, 100));
    this.addComponent(
      new RotationComponent(
        ROTATION_SPEED * (Math.floor(Math.random() * 2) === 1 ? -1 : 1),
      ),
    );
    this.addComponent(new GraphicComponent(Resources.diceTexure.texture));
  }
}
