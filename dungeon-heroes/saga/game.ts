import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import GameContext from "./game-context.ts";

export default class Game {
  constructor(readonly gameContext: GameContext) {}

  /**
   * Initializes the Raylib context.
   */
  init(): void {
    initWindow({
      title: "Dungeon Heroes",
      width: 1280,
      height: 720,
    });

    this.gameContext.onInitialize();
  }

  /**
   * Starts the Raylib main loop and runs the game.
   */
  run(): void {
    while (windowShouldClose() === false) {
      this._update();
      this._draw();
    }
  }

  /**
   * Closes the game down, releases resources.
   */
  close(): void {
    closeWindow();
  }

  private _update(): void {
    this.gameContext.onUpdate();
  }

  private _draw(): void {
    beginDrawing();
    clearBackground(RayWhite);
    endDrawing();
  }
}
