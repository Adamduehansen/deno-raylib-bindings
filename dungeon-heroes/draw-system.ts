import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  endDrawing,
  endMode2D,
  getScreenHeight,
  getScreenWidth,
  RaylibCamera,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import System from "./system.ts";
import { EntityCollection } from "./entity-collection.ts";
import ComponentManager from "./component-manager.ts";
import { TextureComponent, TransformComponent } from "./components.ts";

export default class DrawSystem implements System {
  private _camera: RaylibCamera;

  constructor() {
    this._camera = {
      target: {
        x: 100,
        y: 100,
      },
      offset: {
        x: getScreenWidth() / 2,
        y: getScreenHeight() / 2,
      },
      rotation: 0,
      zoom: 2,
    };
  }

  process(
    entityCollection: EntityCollection,
    componentManager: ComponentManager,
  ): void {
    beginDrawing();

    clearBackground(RayWhite);

    beginMode2D(this._camera);
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
