import {
  beginDrawing,
  clearBackground,
  endDrawing,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
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

      entity.graphics.draw(entity.transform.position);
    }

    if (this.gameContext.debug) {
      drawFPS(0, 0);
    }

    endDrawing();
  }
}
