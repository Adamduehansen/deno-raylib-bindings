import {
  beginDrawing,
  clearBackground,
  closeWindow,
  type Color,
  endDrawing,
  getScreenHeight,
  getScreenWidth,
  initWindow,
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
  background: Color;
}

export class Game {
  private readonly _title: string;
  private readonly _screenWidth: number;
  private readonly _screenHeight: number;
  private readonly _targetFps: number;
  private readonly _scenes: Record<string, Scene>;
  private readonly _background: Color;
  private readonly _enableDebug: boolean;

  private _currentScene: Scene;

  get width(): number {
    return getScreenWidth();
  }

  get height(): number {
    return getScreenHeight();
  }

  constructor(args: GameArgs) {
    // Set members from args.
    this._title = args.title;
    this._screenWidth = args.width;
    this._screenHeight = args.height;
    this._targetFps = args.targetFps;
    this._scenes = args.scenes;
    this._background = args.background;

    // Set members from CLI.
    this._enableDebug = Deno.args.some((args) => args === "--debug");

    // Set default scene.
    const defaultScene = Object.entries(this._scenes).at(0);
    if (defaultScene === undefined) {
      throw new Error("A game needs a scene...");
    }
    this._currentScene = defaultScene[1];
  }

  goToScene(sceneName: string) {
    this._currentScene = this._scenes[sceneName];
    this._currentScene.onActivate();
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

    this._currentScene.onActivate();
  }

  run(): void {
    while (windowShouldClose() === false) {
      // Update
      // --------------------------------------------------------------------------
      this._currentScene.update();

      // Draw
      // --------------------------------------------------------------------------
      beginDrawing();

      clearBackground(this._background);
      this._currentScene.draw();

      this._enableDebug && drawFPS(0, 0);
      if (this._enableDebug) {
        for (const entity of this._currentScene.entities) {
          entity.body?.draw();
        }
      }

      endDrawing();
    }
  }

  close(): void {
    closeWindow();
  }
}
