import {
  closeWindow,
  initWindow,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import GameContext from "./game-context.ts";

export default class Game {
  constructor(protected readonly gameContext: GameContext) {}

  /**
   * Starts the Raylib main loop and runs the game.
   */
  start(): void {
    this._init();

    while (windowShouldClose() === false) {
      this._updateSystem();
    }
  }

  private _updateSystem(): void {
    for (const system of this.gameContext.systems) {
      system.update();
    }
  }

  private _init(): void {
    initWindow({
      title: this.gameContext.title,
      width: this.gameContext.width,
      height: this.gameContext.height,
    });

    setTargetFPS(this.gameContext.targetFps);

    for (const resource of Object.values(this.gameContext.resouces)) {
      resource.load();
    }

    this.gameContext.onInitialize();
  }

  private _close(): void {
    closeWindow();
    for (const resource of Object.values(this.gameContext.resouces)) {
      resource.unload();
    }
  }

  [Symbol.dispose](): void {
    this._close();
  }
}
