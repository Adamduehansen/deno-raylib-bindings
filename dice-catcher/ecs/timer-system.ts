import ComponentManager from "./component-manager.ts";
import { TimerComponent } from "./component.ts";
import EntityCollection from "./entity-manager.ts";

export default class TimerSystem {
  constructor(
    readonly componentManager: ComponentManager,
    readonly entityCollection: EntityCollection,
  ) {}

  update(): void {
    for (const entity of this.entityCollection) {
      if (!this.componentManager.hasComponent(entity, TimerComponent)) {
        continue;
      }

      const timerComponent = this.componentManager.getComponent(
        entity,
        TimerComponent,
      )!;

      timerComponent.update();
    }
  }
}
