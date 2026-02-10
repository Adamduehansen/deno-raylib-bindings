import {
  getFrameTime,
  getScreenHeight,
} from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "./component-manager.ts";
import {
  OffscreenComponent,
  RotationComponent,
  TransformComponent,
  VelocityComponent,
} from "./component.ts";
import EntityCollection from "./entity-manager.ts";

export default class TransformSystem {
  constructor(
    readonly componentManager: ComponentManager,
    readonly entityCollection: EntityCollection,
  ) {}

  update(): void {
    for (const entity of this.entityCollection) {
      if (!this.componentManager.hasComponent(entity, VelocityComponent)) {
        continue;
      }

      const velocityComponent = this.componentManager.getComponent(
        entity,
        VelocityComponent,
      )!;

      const transformComponent = this.componentManager.getComponent(
        entity,
        TransformComponent,
      )!;

      transformComponent.x += velocityComponent.dx * getFrameTime();
      transformComponent.y += velocityComponent.dy * getFrameTime();

      // Rotate the component if it has the RotationComponent.
      if (this.componentManager.hasComponent(entity, RotationComponent)) {
        const rotationComponent = this.componentManager.getComponent(
          entity,
          RotationComponent,
        )!;

        transformComponent.rotation += rotationComponent.rotation;
      }

      // Queue the entity to be removed if it has the OffscreenComponent.
      if (this.componentManager.hasComponent(entity, OffscreenComponent)) {
        if (transformComponent.y > getScreenHeight()) {
          console.log("Remove this entity!", entity.id);
        }
      }
    }
  }
}
