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
import Sprite from "./sprite.ts";

export default class DrawSystem implements System {
  constructor(readonly gameContext: GameContext) {}

  update(): void {
    beginDrawing();
    clearBackground(RayWhite);

    for (const entity of this.gameContext.entityCollection) {
      if ((entity instanceof Sprite) === false) {
        continue;
      }

      const { texture } = entity.graphics.textureResource;
      if (texture === undefined) {
        continue;
      }

      drawTexturePro({
        texture: texture,
        dest: {
          x: entity.transform.position.x,
          y: entity.transform.position.y,
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
