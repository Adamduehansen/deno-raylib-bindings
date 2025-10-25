import { Entity } from "@src/entity.ts";
import { Scene } from "@src/scene.ts";
import {
  beginDrawing,
  Black,
  checkCollisionRecs,
  clearBackground,
  closeWindow,
  drawCircleV,
  drawRectangle,
  endDrawing,
  getScreenWidth,
  initWindow,
  isKeyDown,
  isKeyPressed,
  KeyA,
  KeyD,
  KeySpace,
  Maroon,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "../../raylib-bindings.ts";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;

class Ball extends Entity {
  static radius = 7;

  #paddle: Paddle;
  #active: boolean = false;

  constructor(paddle: Paddle) {
    super({
      pos: {
        x: 0,
        y: 0,
      },
      height: Ball.radius,
      width: Ball.radius,
    });
    this.#paddle = paddle;
  }

  override initialize(): void {
    this.scene?.eventEmitter.on("activate", () => {
      this.#active = true;
      this.velocity.y = -5;
    });
  }

  override render(): void {
    drawCircleV({
      center: {
        x: this.pos.x,
        y: this.pos.y,
      },
      color: Maroon,
      radius: Ball.radius,
    });
  }

  override update(): void {
    super.update();

    // Update ball position.
    if (this.#active === false) {
      this.pos.x = this.#paddle.pos.x + Paddle.width / 2;
      this.pos.y = this.#paddle.pos.y - 20;
    }

    // Check collision with top
    if (this.pos.y < 0) {
      this.velocity.y *= -1;
    }

    // Check collision with walls
    if (this.pos.x < 0 || this.pos.x > getScreenWidth()) {
      this.velocity.x *= -1;
    }

    if (checkCollisionRecs(this.body, this.#paddle.body)) {
      const paddleCenter = this.#paddle.pos.x + Paddle.width / 2;

      this.velocity.y *= -1;
      this.velocity.x = (this.pos.x - paddleCenter) / 5;
    }
  }
}

class Paddle extends Entity {
  static width = 80;
  static height = 20;

  constructor() {
    super({
      pos: {
        x: GAME_WIDTH / 2 - Paddle.width / 2,
        y: Math.floor(GAME_HEIGHT * 7 / 8),
      },
      width: Paddle.width,
      height: Paddle.height,
    });
  }

  override update(): void {
    super.update();
    if (isKeyDown(KeyD)) {
      this.pos.x += 5;
    }
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }

    if (isKeyDown(KeyA)) {
      this.pos.x -= 5;
    }
    if (this.pos.x + Paddle.width > GAME_WIDTH) {
      this.pos.x = GAME_WIDTH - Paddle.width;
    }
  }

  override render(): void {
    drawRectangle({
      color: Black,
      height: Paddle.height,
      width: Paddle.width,
      posX: this.pos.x,
      posY: this.pos.y,
    });
  }
}

class GameScene extends Scene {
  constructor() {
    super();

    const paddle = new Paddle();
    this.add(paddle);
    this.add(new Ball(paddle));
  }

  override update(): void {
    super.update();

    if (isKeyPressed(KeySpace)) {
      this.eventEmitter.emit("activate");
    }
  }
}

class GameOverScene extends Scene {}

const gameScene = new GameScene();
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
