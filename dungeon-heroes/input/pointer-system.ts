import {
  getMousePosition,
  RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { RaylibRectangle } from "@adamduehansen/raylib-bindings/r-shapes";
import System from "../entity-component-system/system.ts";
import { EntityCollection } from "../entity-component-system/entity-collection.ts";
import ComponentManager from "../entity-component-system/component-manager.ts";
import PointerComponent from "../entity-component-system/pointer-component.ts";
import TransformComponent from "../entity-component-system/transform-component.ts";
import { Entity } from "../entity-component-system/entity.ts";

export default class PointerSystem implements System {
  private _currentlyHoveredEntities: Set<Entity> = new Set();

  process(
    entityCollection: EntityCollection,
    componentManager: ComponentManager,
  ): void {
    const mousePosition = getMousePosition();
    const newHoveredEntities: Set<Entity> = new Set();

    for (const entity of entityCollection) {
      const hasPointerComponent = componentManager.has(
        entity,
        PointerComponent,
      );
      const hasTransformComponent = componentManager.has(
        entity,
        TransformComponent,
      );

      if (hasPointerComponent === false || hasTransformComponent === false) {
        continue;
      }

      const pointerComponent = componentManager.get(entity, PointerComponent)!;
      const transformComponent = componentManager.get(
        entity,
        TransformComponent,
      )!;

      // Create a collision rectangle for the entity
      const entityRect: RaylibRectangle = {
        x: transformComponent.position.x,
        y: transformComponent.position.y,
        width: 16, // Default width, you might want to make this configurable
        height: 16, // Default height, you might want to make this configurable
      };

      const isHovered = this._checkCollisionPointRec(mousePosition, entityRect);

      if (isHovered) {
        newHoveredEntities.add(entity);
        pointerComponent.onMouseOver();

        // Check if this entity wasn't hovered before
        if (!this._currentlyHoveredEntities.has(entity)) {
          pointerComponent.onMouseEnter();
        }
      }
    }

    // Check for entities that were hovered but aren't anymore
    for (const entity of this._currentlyHoveredEntities) {
      if (!newHoveredEntities.has(entity)) {
        const pointerComponent = componentManager.get(entity, PointerComponent);
        if (pointerComponent) {
          pointerComponent.onMouseExit();
        }
      }
    }

    // Update the currently hovered entities
    this._currentlyHoveredEntities = newHoveredEntities;
  }

  private _checkCollisionPointRec(
    vector: RaylibVector,
    rect: RaylibRectangle,
  ): boolean {
    return vector.x > rect.x &&
      vector.x < rect.x + rect.width &&
      vector.y > rect.y &&
      vector.y < rect.y + rect.height;
  }
}
