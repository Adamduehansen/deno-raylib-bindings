import { GraphicComponent, PositionComponent } from "./component.ts";
import Entity from "./entity.ts";
import ComponentManager from "./component-manager.ts";
import Resources from "./resources.ts";

export default class Background extends Entity {
  constructor(id: number, componentManager: ComponentManager) {
    super(id);

    componentManager.addComponent(
      this,
      new PositionComponent(-100, -300),
    );

    componentManager.addComponent(
      this,
      new GraphicComponent(Resources.backgroundTexture.texture),
    );
  }
}
