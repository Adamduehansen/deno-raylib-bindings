import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  DarkGray,
  endDrawing,
  endMode2D,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import System from "./system.ts";
import { EntityCollection } from "./entity-collection.ts";
import ComponentManager from "./component-manager.ts";
import { TextureComponent, TransformComponent } from "./components.ts";
import Camera from "./camera.ts";

export default class DrawSystem implements System {
  private _camera = new Camera();

  process(
    entityCollection: EntityCollection,
    componentManager: ComponentManager,
  ): void {
    // Update
    // ------------------------------------------------------------------------
    this._camera.update();

    // Drawing
    // ------------------------------------------------------------------------
    beginDrawing();

    clearBackground(DarkGray);

    beginMode2D(this._camera.raylibCamera);
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
    endMode2D();

    drawFPS(0, 0);

    endDrawing();
  }
}
