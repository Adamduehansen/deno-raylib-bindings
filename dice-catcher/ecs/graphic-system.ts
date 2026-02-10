import ComponentManager from "./component-manager.ts";
import { GraphicComponent, PositionComponent } from "./component.ts";
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

      const positionComponent = this._componentManager.getComponent(
        entity,
        PositionComponent,
      );

      if (positionComponent === null) {
        throw new Error("Graphic component requires the position component!");
      }

      graphicComponent.draw(positionComponent);
    }
  }
}
