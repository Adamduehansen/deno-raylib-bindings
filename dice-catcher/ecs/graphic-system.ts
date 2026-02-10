import ComponentManager from "./component-manager.ts";
import { GraphicComponent, TransformComponent } from "./component.ts";
import EntityCollection from "./entity-manager.ts";

export default class GraphicSystem {
  constructor(
    readonly componentManager: ComponentManager,
    readonly entityCollection: EntityCollection,
  ) {}

  draw(): void {
    for (const entity of this.entityCollection) {
      if (!this.componentManager.hasComponent(entity, GraphicComponent)) {
        continue;
      }

      const graphicComponent = this.componentManager.getComponent(
        entity,
        GraphicComponent,
      )!;

      const transformComponent = this.componentManager.getComponent(
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
