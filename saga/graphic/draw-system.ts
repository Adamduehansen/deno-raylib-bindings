import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  DarkGray,
  endDrawing,
  endMode2D,
  Green,
  type RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS, drawText } from "@adamduehansen/raylib-bindings/r-text";
import type { System } from "../ecs/system.ts";
import type { EntityCollection } from "../ecs/entity-collection.ts";
import type { ComponentManager } from "../ecs/component-manager.ts";
import { TransformComponent } from "../physics/transform-component.ts";
import { Camera } from "../camera.ts";
import { type Graphic, Rectangle, Sprite } from "./graphic.ts";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import { GraphicComponent } from "./graphic-component.ts";
import { drawRectangleV } from "@adamduehansen/raylib-bindings/r-shapes";

export class DrawSystem implements System {
  private _camera = new Camera({
    target: {
      x: 0,
      y: 0,
    },
    offset: {
      x: 0,
      y: 0,
    },
    zoom: 0,
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
      const { color, flipHorizontal, flipVertically, source, texture } =
        graphic;
      drawTexturePro({
        texture: texture,
        source: {
          ...source,
          width: flipHorizontal ? -source.width : source.width,
          height: flipVertically ? -source.height : source.height,
        },
        dest: {
          x: position.x,
          y: position.y,
          width: source.width,
          height: source.height,
        },
        origin: {
          x: source.width / 2,
          y: source.height / 2,
        },
        rotation: 0,
        tint: color,
      });
    } else if (graphic instanceof Rectangle) {
      const { width, height, color } = graphic;
      drawRectangleV({
        position: position,
        color: color,
        size: {
          x: width,
          y: height,
        },
      });
    }
  }
}
