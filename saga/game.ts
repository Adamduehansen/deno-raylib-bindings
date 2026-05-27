import {
  beginDrawing,
  Black,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  type RaylibColor,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS, drawText } from "@adamduehansen/raylib-bindings/r-text";
import type { Resource } from "./resource/resource.ts";
import type { Scene } from "./scene.ts";
import { drawSprite } from "./draw-entity.ts";
import { Logger } from "./logger.ts";
import { GameContext } from "./game-context.ts";
import { drawBody } from "./draw-body.ts";

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
  isFullscreen?: boolean;
  onUpdate?: (game: Game) => void;
}

export class Game {
  readonly title: string;
  readonly width: number;
  readonly height: number;
  readonly targetFPS: number;
  readonly resources: Record<string, Resource>;
  readonly scenes: Record<string, Scene>;
  readonly currentScene: Scene;
  readonly backgroundColor: RaylibColor;
  readonly isFullscreen: boolean;

  /**
   * Creates a new instance of a game. This will prepare the properties of the
   * game. Call {@linkcode start} to start the Raylib loop and the game.
   */
  constructor(args: GameArgs) {
    this.title = args.title;
    this.width = args.width;
    this.height = args.height;
    this.scenes = args.scenes;

    this.isFullscreen = args.isFullscreen ?? false;
    this.targetFPS = args.targetFPS ?? DEFAULT_TARGET_FPS;
    this.resources = args.resources ?? DEFAULT_RESOURCES;
    this.backgroundColor = args.backgroundColor ?? Black;

    this.currentScene = this.scenes[Object.keys(this.scenes)[0]];
  }

  setFullScreen(value: boolean): void {
    // TODO: implement this feature.

    // const display = getCurrentMonitor();
    // setWindowSize(getMonitorWidth(display), getMonitorHeight(display));
    // toggleFullScreen();
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

    Logger.getInstance().info("Loading resources...");
    for (const resource of Object.values(this.resources)) {
      resource.load();
    }

    Logger.getInstance().info("Initializing scenes...");
    for (const scene of Object.values(this.scenes)) {
      scene.init();
    }

    Logger.getInstance().info("Running game...");
    while (windowShouldClose() === false) {
      // Update the game
      // ----------------------------------------------------------------------
      this.currentScene.update();

      // Draw the game
      // ----------------------------------------------------------------------
      beginDrawing();

      clearBackground(this.backgroundColor);

      this.currentScene.camera.beginRender();

      // TODO: cache the current length of entities and update/render only that list.

      for (const entity of this.currentScene.entities) {
        drawSprite(entity);

        if (GameContext.isDebug) {
          drawBody(entity);
        }
      }

      this.currentScene.camera.endRender();

      if (GameContext.isDebug) {
        drawFPS(0, 0);
        drawText({
          color: [0, 255, 0, 150],
          fontSize: 20,
          posX: 0,
          posY: 20,
          text: `No. of entities: ${this.currentScene.entities.length}`,
        });
      }

      endDrawing();
    }
  }

  [Symbol.dispose]() {
    Logger.getInstance().info("Disposing the game...");

    Logger.getInstance().info("Unloading resources...");
    for (const resource of Object.values(this.resources)) {
      resource.unload();
    }

    closeWindow();
  }
}
