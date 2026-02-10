import ComponentManager from "./component-manager.ts";
import { PositionComponent, VelocityComponent } from "./component.ts";
import Entity from "./entity.ts";

export default class FallSystem {
  private _componentManager: ComponentManager;

  constructor(componentManager: ComponentManager) {
    this._componentManager = componentManager;
  }

  update(entities: Entity[]): void {
    for (const entity of entities) {
      if (!this._componentManager.hasComponent(entity, VelocityComponent)) {
        continue;
      }

      const velocityComponent = this._componentManager.getComponent(
        entity,
        VelocityComponent,
      )!;

      const positionComponent = this._componentManager.getComponent(
        entity,
        PositionComponent,
      )!;

      positionComponent.x += velocityComponent.dx;
      positionComponent.y += velocityComponent.dy;
    }
  }
}
