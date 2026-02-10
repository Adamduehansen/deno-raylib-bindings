import { GraphicComponent, TransformComponent } from "../ecs/component.ts";
import Entity from "../ecs/entity.ts";
import ComponentManager from "../ecs/component-manager.ts";
import Resources from "../resources.ts";

export default class Background extends Entity {
  constructor(id: number, componentManager: ComponentManager) {
    super(id, componentManager);

    this.addComponent(
      new TransformComponent(
        Resources.backgroundTexture.texture.width / 4,
        Resources.backgroundTexture.texture.height / 4,
      ),
    );
    this.addComponent(
      new GraphicComponent(Resources.backgroundTexture.texture),
    );
  }
}
