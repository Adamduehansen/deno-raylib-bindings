import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  DarkGray,
  endDrawing,
  endMode2D,
  getScreenHeight,
  getScreenWidth,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import System from "./system.ts";
import { EntityCollection } from "./entity-collection.ts";
import ComponentManager from "./component-manager.ts";
import { GraphicComponent, TransformComponent } from "./components.ts";
import Camera from "./camera.ts";

export default class DrawSystem implements System {
  private _camera = new Camera({
    target: {
      x: 100,
      y: 100,
    },
    offset: {
      x: getScreenWidth() / 2,
      y: getScreenHeight() / 2,
    },
    zoom: 2,
  });

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
      const hasGraphicComponent = componentManager.has(
        entity,
        GraphicComponent,
      );
      const hasTransformComponent = componentManager.has(
        entity,
        TransformComponent,
      );

      if (hasGraphicComponent === false || hasTransformComponent === false) {
        continue;
      }

      const graphicComponent = componentManager.get(entity, GraphicComponent)!;
      const transformComponent = componentManager.get(
        entity,
        TransformComponent,
      )!;
      graphicComponent.draw(transformComponent.position);
    }
    endMode2D();

    drawFPS(0, 0);

    endDrawing();
  }
}
