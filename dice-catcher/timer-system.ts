import ComponentManager from "./component-manager.ts";
import { TimerComponent } from "./component.ts";
import Entity from "./entity.ts";

export default class TimerSystem {
  private _componentManager: ComponentManager;

  constructor(componentManager: ComponentManager) {
    this._componentManager = componentManager;
  }

  update(entities: Entity[]): void {
    for (const entity of entities) {
      if (!this._componentManager.hasComponent(entity, TimerComponent)) {
        continue;
      }

      const timerComponent = this._componentManager.getComponent(
        entity,
        TimerComponent,
      )!;

      timerComponent.update();
    }
  }
}
