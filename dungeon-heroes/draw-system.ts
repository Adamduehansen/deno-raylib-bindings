import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  DarkGray,
  endDrawing,
  endMode2D,
  getScreenHeight,
  getScreenWidth,
  Green,
  RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS, drawText } from "@adamduehansen/raylib-bindings/r-text";
import System from "./system.ts";
import { EntityCollection } from "./entity-collection.ts";
import ComponentManager from "./component-manager.ts";
import { GraphicComponent, TransformComponent } from "./components.ts";
import Camera from "./camera.ts";
import { Graphic, Sprite } from "./graphic.ts";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";

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

      this._draw(graphicComponent.graphic, transformComponent.position);
    }
    endMode2D();

    drawFPS(0, 0);
    drawText({
      posX: 0,
      posY: 20,
      text: `Entities: ${entityCollection.length}`,
      fontSize: 20,
      color: Green,
    });

    endDrawing();
  }

  private _draw(graphic: Graphic, position: RaylibVector): void {
    if (graphic instanceof Sprite) {
      drawTexturePro({
        texture: graphic.texture,
        source: graphic.source,
        dest: {
          x: position.x,
          y: position.y,
          width: graphic.source.width,
          height: graphic.source.height,
        },
        origin: {
          x: graphic.source.width / 2,
          y: graphic.source.height / 2,
        },
        rotation: 0,
        tint: graphic.color,
      });
    }
  }
}
