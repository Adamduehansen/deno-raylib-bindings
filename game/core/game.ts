import {
  beginDrawing,
  beginMode2D,
  Black,
  clearBackground,
  closeWindow,
  endDrawing,
  endMode2D,
  initWindow,
  LOG_DEBUG,
  LOG_INFO,
  RaylibColor,
  setTargetFPS,
  setTraceLogLevel,
  traceLog,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import { Resource } from "./resource/resource.ts";
import { Scene } from "./scene.ts";
import { drawEntity } from "./draw-entity.ts";

const DEFAULT_TARGET_FPS = 60;
const DEFAULT_RESOURCES = {};

interface GameArgs {
  title: string;
  width: number;
  height: number;
  scenes: Record<string, Scene>;
  targetFPS?: number;
  resources?: Record<string, Resource>;
  backgroundColor?: RaylibColor;
}

export default class Game {
  readonly title: string;
  readonly width: number;
  readonly height: number;
  readonly targetFPS: number;
  readonly isDebug: boolean;
  readonly resources: Record<string, Resource>;
  readonly scenes: Record<string, Scene>;
  readonly currentScene: Scene;
  readonly backgroundColor: RaylibColor;

  /**
   * Creates a new instance of a game. This will prepare the properties of the
   * game. Call {@linkcode start} to start the Raylib loop and the game.
   */
  constructor(args: GameArgs) {
    this.title = args.title;
    this.width = args.width;
    this.height = args.height;
    this.scenes = args.scenes;

    this.targetFPS = args.targetFPS ?? DEFAULT_TARGET_FPS;
    this.resources = args.resources ?? DEFAULT_RESOURCES;
    this.backgroundColor = args.backgroundColor ?? Black;

    this.isDebug = Deno.args.includes("--debug");
    this.currentScene = this.scenes[Object.keys(this.scenes)[0]];
  }

  /**
   * Initializes Raylib and begins the game loop.
   */
  start(): void {
    initWindow({
      title: this.title,
      width: this.width,
      height: this.height,
    });

    setTargetFPS(60);

    // TODO: Create a logger and move the initialization to that.
    setTraceLogLevel(this.isDebug ? LOG_DEBUG : LOG_INFO);

    traceLog(LOG_INFO, "Loading resources...");
    for (const resource of Object.values(this.resources)) {
      resource.load();
    }

    traceLog(LOG_INFO, "Initializing scenes...");
    for (const scene of Object.values(this.scenes)) {
      scene.init();
    }

    while (windowShouldClose() === false) {
      // Update the game
      // ----------------------------------------------------------------------
      this.currentScene.update();

      // Draw the game
      // ----------------------------------------------------------------------
      beginDrawing();

      clearBackground(this.backgroundColor);

      beginMode2D(this.currentScene.camera.nativeCamera);

      for (const entity of this.currentScene.entities) {
        drawEntity(entity);
      }

      endMode2D();

      if (this.isDebug) {
        drawFPS(0, 0);
        // TODO: Draw how many entities are on screen.
      }

      endDrawing();
    }
  }

  [Symbol.dispose]() {
    traceLog(LOG_INFO, "Disposing the game...");

    traceLog(LOG_INFO, "Unloading resources...");
    for (const resource of Object.values(this.resources)) {
      resource.unload();
    }

    closeWindow();
  }
}
