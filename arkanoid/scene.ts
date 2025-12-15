import { Ball, Paddle } from "./entities.ts";

abstract class Scene {
  abstract update(): void;
  abstract draw(): void;
}

// GameScene
// ----------------------------------------------------------------------------

export class GameScene extends Scene {
  readonly paddle = new Paddle();
  readonly ball = new Ball();

  override update(): void {
    this.paddle.update();
    this.ball.update();
  }

  override draw(): void {
    this.paddle.draw();
    this.ball.draw();
  }
}

// EndScene
// ----------------------------------------------------------------------------

export class EndScene extends Scene {
  override update(): void {
  }

  override draw(): void {
  }
}
