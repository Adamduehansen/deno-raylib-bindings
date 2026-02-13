import {
  beginDrawing,
  clearBackground,
  endDrawing,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import System from "./system.ts";
import GameContext from "./game-context.ts";

export default class GraphicSystem implements System {
  constructor(readonly gameContext: GameContext) {}

  update(): void {
    beginDrawing();
    clearBackground(RayWhite);
    endDrawing();
  }
}
