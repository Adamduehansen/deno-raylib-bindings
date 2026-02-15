import {
  beginDrawing,
  clearBackground,
  endDrawing,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import System from "./system.ts";
import GameContext from "./game-context.ts";

export default class GraphicSystem implements System {
  constructor(readonly gameContext: GameContext) {}

  update(): void {
    beginDrawing();
    clearBackground(RayWhite);

    for (const entity of this.gameContext.entityCollection) {
      entity.graphics.draw();
    }

    if (this.gameContext.debug) {
      drawFPS(0, 0);
    }

    endDrawing();
  }
}
