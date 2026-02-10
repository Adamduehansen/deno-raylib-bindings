import ComponentManager from "./component-manager.ts";
import { GraphicComponent, TransformComponent } from "./component.ts";
import Entity from "./entity.ts";

export default class GraphicSystem {
  private _componentManager: ComponentManager;

  constructor(componentManager: ComponentManager) {
    this._componentManager = componentManager;
  }

  draw(entities: Entity[]): void {
    for (const entity of entities) {
      if (!this._componentManager.hasComponent(entity, GraphicComponent)) {
        continue;
      }

      const graphicComponent = this._componentManager.getComponent(
        entity,
        GraphicComponent,
      )!;

      const transformComponent = this._componentManager.getComponent(
        entity,
        TransformComponent,
      );

      if (transformComponent === null) {
        throw new Error("Graphic component requires the position component!");
      }

      graphicComponent.draw(transformComponent, transformComponent.rotation);
    }
  }
}
