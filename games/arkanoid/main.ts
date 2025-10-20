import { Entity } from "@src/entity.ts";
import { Scene } from "@src/scene.ts";
import {
  beginDrawing,
  Black,
  clearBackground,
  closeWindow,
  drawRectangle,
  endDrawing,
  initWindow,
  isKeyDown,
  KeyA,
  KeyD,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "../../raylib-bindings.ts";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;

const PADDLE_WIDTH = 80;

class Paddle extends Entity {
  constructor() {
    super({
      pos: {
        x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
        y: Math.floor(GAME_HEIGHT * 7 / 8),
      },
    });
  }

  override update(): void {
    if (isKeyDown(KeyD)) {
      this.pos.x += 5;
    }
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }

    if (isKeyDown(KeyA)) {
      this.pos.x -= 5;
    }
    if (this.pos.x + PADDLE_WIDTH > GAME_WIDTH) {
      this.pos.x = GAME_WIDTH - PADDLE_WIDTH;
    }
  }

  override render(): void {
    drawRectangle({
      color: Black,
      height: 20,
      width: 80,
      posX: this.pos.x,
      posY: this.pos.y,
    });
  }
}

class GameScene extends Scene {
}

class GameOverScene extends Scene {
}

const gameScene = new GameScene();
const paddle = new Paddle();
gameScene.add(paddle);

const gameOverScene = new GameOverScene();

const scenes = {
  gameScene,
  gameOverScene,
};
const currentScene: keyof typeof scenes = "gameScene";

initWindow({
  title: "Arkanoid",
  height: GAME_HEIGHT,
  width: GAME_WIDTH,
});

setTargetFPS(60);

while (windowShouldClose() === false) {
  // Update
  // ==========================================================================
  scenes[currentScene].update();

  // Render
  // ==========================================================================
  beginDrawing();
  clearBackground(RayWhite);
  scenes[currentScene].render();
  endDrawing();
}

closeWindow();
