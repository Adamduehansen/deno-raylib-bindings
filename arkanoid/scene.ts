import { EventEmitter } from "@adamduehansen/raylib-bindings";
import { Ball, Paddle } from "./entities.ts";
import { isKeyPressed, KeySpace } from "@adamduehansen/raylib-bindings/r-core";

abstract class Scene {
  abstract initialize(): void;
  abstract update(): void;
  abstract draw(): void;
}

// GameScene
// ----------------------------------------------------------------------------

export class GameScene extends Scene {
  readonly paddle = new Paddle();
  readonly ball = new Ball();
  readonly events = new EventEmitter<{
    "activate": undefined;
    "game_over": { score: number };
  }>();

  private _isActive = false;

  override initialize(): void {
    this.paddle.initialize(this);
    this.ball.initialize(this);
  }

  override update(): void {
    // Handle input
    if (isKeyPressed(KeySpace) && this._isActive === false) {
      this._isActive = true;
      this.events.emit("activate");
    }

    // Update entities
    this.paddle.update(this);
    this.ball.update(this);
  }

  override draw(): void {
    this.paddle.draw();
    this.ball.draw();
  }
}

// EndScene
// ----------------------------------------------------------------------------

export class EndScene extends Scene {
  override initialize(): void {
  }

  override update(): void {
  }

  override draw(): void {
  }
}
