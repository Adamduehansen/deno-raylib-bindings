import {
  beginDrawing,
  clearBackground,
  endDrawing,
  RayWhite,
  White,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import System from "./system.ts";
import GameContext from "./game-context.ts";
import { GraphicsComponent, TransformComponent } from "./component.ts";

export default class DrawSystem implements System {
  constructor(readonly gameContext: GameContext) {}

  update(): void {
    beginDrawing();
    clearBackground(RayWhite);

    for (const entity of this.gameContext.entityCollection) {
      const graphics = entity.getComponent(GraphicsComponent);
      const transform = entity.getComponent(TransformComponent);

      if (graphics === undefined || transform === undefined) {
        continue;
      }

      const { texture } = graphics.textureResource;

      if (texture === undefined) {
        return;
      }

      drawTexturePro({
        texture: texture,
        dest: {
          x: transform.position.x,
          y: transform.position.y,
          width: texture.width,
          height: texture.height,
        },
        source: {
          x: 0,
          y: 0,
          width: texture.width,
          height: texture.height,
        },
        origin: {
          x: texture.width / 2,
          y: texture.height / 2,
        },
        rotation: 0,
        tint: White,
      });
    }

    if (this.gameContext.debug) {
      drawFPS(0, 0);
    }

    endDrawing();
  }
}
