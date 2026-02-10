import { getFrameTime } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "./component-manager.ts";
import {
  RotationComponent,
  TransformComponent,
  VelocityComponent,
} from "./component.ts";
import Entity from "./entity.ts";

export default class TransformSystem {
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

      const tranformComponent = this._componentManager.getComponent(
        entity,
        TransformComponent,
      )!;

      tranformComponent.x += velocityComponent.dx * getFrameTime();
      tranformComponent.y += velocityComponent.dy * getFrameTime();

      if (this._componentManager.hasComponent(entity, RotationComponent)) {
        const rotationComponent = this._componentManager.getComponent(
          entity,
          RotationComponent,
        )!;

        tranformComponent.rotation += rotationComponent.rotation;
      }
    }
  }
}
