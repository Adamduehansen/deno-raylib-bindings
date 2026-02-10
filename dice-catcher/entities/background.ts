import { GraphicComponent, PositionComponent } from "../ecs/component.ts";
import Entity from "../ecs/entity.ts";
import ComponentManager from "../ecs/component-manager.ts";
import Resources from "../resources.ts";

export default class Background extends Entity {
  constructor(id: number, componentManager: ComponentManager) {
    super(id, componentManager);

    this.addComponent(new PositionComponent(-100, -300));
    this.addComponent(
      new GraphicComponent(Resources.backgroundTexture.texture),
    );
  }
}
