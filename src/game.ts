import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "./r-core.ts";
import { drawFPS } from "./r-text.ts";
import { ResourceManager } from "./resource.ts";
import Scene from "./scene.ts";

type SceneFactory = Record<string, Scene>;

type SceneKey = keyof SceneFactory;

interface GameArgs {
  title: string;
  height: number;
  width: number;
  fps: number;
  resourceManager: ResourceManager;
  scenes: SceneFactory;
  currentScene: SceneKey;
}

export default class Game {
  private _title: string;
  private _width: number;
  private _height: number;
  private _fps: number;
  private _resourceManager: ResourceManager;
  private _currentScene: Scene;

  constructor(args: GameArgs) {
    this._title = args.title;
    this._width = args.width;
    this._height = args.height;
    this._fps = args.fps;
    this._resourceManager = args.resourceManager;
    this._currentScene = args.scenes[args.currentScene];
  }

  /**
   * Initializes the game.
   */
  initialize(): void {
    initWindow({
      title: this._title,
      height: this._height,
      width: this._width,
    });

    setTargetFPS(this._fps);

    this._resourceManager.load();
  }

  /**
   * Run the game. This will run until a close condition is hit.
   */
  run(): void {
    while (windowShouldClose() === false) {
      // Update
      // ======================================================================
      this._currentScene.onUpdate(this);

      // Render
      // ======================================================================
      beginDrawing();
      clearBackground(RayWhite);

      this._currentScene.onRender();

      drawFPS(0, 0);
      endDrawing();
    }
  }

  /**
   * Closes the game.
   */
  close(): void {
    this._resourceManager.unload();

    closeWindow();
  }
}
