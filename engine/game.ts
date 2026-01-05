import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getScreenHeight,
  getScreenWidth,
  initWindow,
  type RaylibColor,
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
  background: RaylibColor;
}

export class Game {
  private readonly _title: string;
  private readonly _screenWidth: number;
  private readonly _screenHeight: number;
  private readonly _targetFps: number;
  private readonly _scenes: Record<string, Scene>;
  private readonly _background: RaylibColor;
  private readonly _enableDebug: boolean;

  private _currentScene: Scene;
  private _queredNextScene?: string;

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

  /**
   * Queries a scene switch. The scene will be switched during the end of the
   * game loop.
   *
   * @param sceneName The name of the scene.
   */
  goToScene(sceneName: string) {
    this._queredNextScene = sceneName;
  }

  /**
   * Initializes the game in order of these steps:
   * 1. Initializes Raylib with `initWindow` and `setTargetFPS`.
   * 2. Calls {@linkcode Scene.initialize} on all scenes.
   * 3. Calls {@linkcode Scene.onActivate} and emits the "activated" on the current
   * scene.
   */
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
    this._currentScene.events.emit("activated");
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

      // Go to next scene if any is given.
      // This is to prevent a bug where entities will be drawn on the
      // ----------------------------------------------------------------------
      if (this._queredNextScene !== undefined) {
        this._currentScene.onDisable();
        this._currentScene.events.emit("disabled");
        this._currentScene = this._scenes[this._queredNextScene];
        this._currentScene.onActivate();
        this._currentScene.events.emit("activated");
        this._queredNextScene = undefined;
      }
    }
  }

  close(): void {
    closeWindow();
  }
}
