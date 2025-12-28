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
import type { Scene } from "./scene.ts";

interface GameArgs {
  title: string;
  height: number;
  width: number;
  targetFps: number;
  scenes: Record<string, Scene>;
}

export class Game {
  private readonly _title: string;
  private readonly _screenWidth: number;
  private readonly _screenHeight: number;
  private readonly _targetFps: number;
  private readonly _scenes: Record<string, Scene>;

  private _currentScene: Scene;

  constructor(args: GameArgs) {
    this._title = args.title;
    this._screenWidth = args.width;
    this._screenHeight = args.height;
    this._targetFps = args.targetFps;
    this._scenes = args.scenes;

    const defaultScene = Object.entries(this._scenes).at(0);
    if (defaultScene === undefined) {
      throw new Error("A game needs a scene...");
    }
    this._currentScene = defaultScene[1];
  }

  goToScene(sceneName: string) {
    this._currentScene = this._scenes[sceneName];
  }

  init(): void {
    initWindow({
      title: this._title,
      width: this._screenWidth,
      height: this._screenHeight,
    });

    setTargetFPS(this._targetFps);

    for (const scene of Object.values(this._scenes)) {
      scene.initialize(this);
    }
  }

  run(): void {
    while (windowShouldClose() === false) {
      // Update
      // --------------------------------------------------------------------------
      this._currentScene.update();

      // Draw
      // --------------------------------------------------------------------------
      beginDrawing();

      clearBackground(RayWhite);
      this._currentScene.draw();

      drawFPS(0, 0);

      endDrawing();
    }
  }

  close(): void {
    closeWindow();
  }
}
