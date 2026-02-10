import { getScreenWidth } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "../ecs/component-manager.ts";
import {
  GraphicComponent,
  PositionComponent,
  VelocityComponent,
} from "../ecs/component.ts";
import Entity from "../ecs/entity.ts";
import Resources from "../resources.ts";

export default class Dice extends Entity {
  constructor(id: number, componentManager: ComponentManager) {
    super(id, componentManager);
    const spawnX = Math.floor(Math.random() * getScreenWidth());

    this.addComponent(new PositionComponent(spawnX, -80));
    this.addComponent(new VelocityComponent(0, 2));
    this.addComponent(new GraphicComponent(Resources.diceTexure.texture));
  }
}
