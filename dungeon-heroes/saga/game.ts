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
  constructor(protected readonly gameContext: GameContext) {
    this._init();
  }

  /**
   * Starts the Raylib main loop and runs the game.
   */
  start(): void {
    while (windowShouldClose() === false) {
      this._update();
      this._draw();
    }
  }

  private _init(): void {
    initWindow({
      title: this.gameContext.title,
      width: this.gameContext.width,
      height: this.gameContext.height,
    });

    this.gameContext.onInitialize();
  }

  private _close(): void {
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

  [Symbol.dispose](): void {
    this._close();
  }
}
