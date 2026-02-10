import { getScreenWidth } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "./component-manager.ts";
import {
  GraphicComponent,
  PositionComponent,
  VelocityComponent,
} from "./component.ts";
import Entity from "./entity.ts";
import Resources from "./resources.ts";

export default class Dice extends Entity {
  constructor(id: number, componentManager: ComponentManager) {
    super(id);
    const spawnX = Math.floor(Math.random() * getScreenWidth());

    componentManager.addComponent(this, new PositionComponent(spawnX, -80));
    componentManager.addComponent(this, new VelocityComponent(0, 2));
    componentManager.addComponent(
      this,
      new GraphicComponent(Resources.diceTexure.texture),
    );
  }
}
