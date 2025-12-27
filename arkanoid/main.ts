import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import { GameScene } from "./scene.ts";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 450;

class Game {
  private _gameScene: GameScene = new GameScene();

  init(): void {
    initWindow({
      title: "Arkanoid",
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
    });

    setTargetFPS(60);

    this._gameScene.initialize();
  }

  run(): void {
    while (windowShouldClose() === false) {
      // Update
      // --------------------------------------------------------------------------
      this._gameScene.update();

      // Draw
      // --------------------------------------------------------------------------
      beginDrawing();

      clearBackground(RayWhite);

      this._gameScene.draw();

      drawFPS(0, 0);

      endDrawing();
    }
  }
  close(): void {
    closeWindow();
  }
}

const game = new Game();
game.init();
game.run();
game.close();
