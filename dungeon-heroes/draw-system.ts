import {
  beginDrawing,
  clearBackground,
  endDrawing,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import System from "./system.ts";
import { EntityCollection } from "./entity-collection.ts";
import ComponentManager from "./component-manager.ts";
import { TextureComponent, TransformComponent } from "./components.ts";

export default class DrawSystem implements System {
  process(
    entityCollection: EntityCollection,
    componentManager: ComponentManager,
  ): void {
    beginDrawing();
    clearBackground(RayWhite);

    // TODO:
    // 1. Query all entities with Graphic and Transform components.
    // 2. Render the components on a position

    for (const entity of entityCollection) {
      const hasGraphic = componentManager.has(entity, TextureComponent);
      const hasTransform = componentManager.has(entity, TransformComponent);

      if (hasGraphic === false || hasTransform === false) {
        continue;
      }

      const graphic = componentManager.get(entity, TextureComponent)!;
      const transform = componentManager.get(entity, TransformComponent)!;
      graphic.draw(transform.position);
    }

    // for (const entity of this.gameContext.entityCollection) {
    //   if ((entity instanceof Sprite) === false) {
    //     continue;
    //   }

    //   entity.graphics.draw(entity.transform.position);
    // }

    // if (this.gameContext.debug) {
    drawFPS(0, 0);
    // }

    endDrawing();
  }
}
