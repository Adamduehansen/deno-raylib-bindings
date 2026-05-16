import {
  closeWindow,
  initWindow,
  LOG_DEBUG,
  LOG_INFO,
  setTargetFPS,
  setTraceLogLevel,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { Resource } from "./resource/resource.ts";
import { Scene } from "./scene.ts";

const DEFAULT_TARGET_FPS = 60;
const DEFAULT_RESOURCES = {};

interface GameArgs {
  title: string;
  width: number;
  height: number;
  targetFPS?: number;
  resources?: Record<string, Resource>;
  scenes: Record<string, Scene>;
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

    this.isDebug = Deno.args.includes("--debug");
    this.currentScene = this.scenes[0];
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
