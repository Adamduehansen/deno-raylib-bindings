import { EventEmitter } from "@adamduehansen/raylib-bindings";
import { Ball, Brick, Paddle } from "./entities.ts";
import {
  getScreenWidth,
  isKeyPressed,
  KeySpace,
} from "@adamduehansen/raylib-bindings/r-core";
import { vec } from "./vector.ts";

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

  private _bricks: Brick[] = [new Brick()];

  get bricks(): readonly Brick[] {
    return this._bricks;
  }

  readonly events = new EventEmitter<{
    "activate": undefined;
    "game_over": { score: number };
    "brick_destroyed": { id: number };
  }>();

  private _isActive = false;

  override initialize(): void {
    // Initialize game objects.
    this.paddle.initialize(this);
    this.ball.initialize(this);
    for (const brick of this._bricks) {
      brick.initialize(this);
    }
    this._bricks[0].pos = vec(getScreenWidth() / 2, 100);

    // Initialize event listeners
    this.events.on("brick_destroyed", (data) => {
      this._bricks = this._bricks.filter((brick) => brick.id !== data?.id);
    });
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
    for (const brick of this._bricks) {
      brick.update(this);
    }
  }

  override draw(): void {
    this.ball.draw();
    this.paddle.draw();
    for (const brick of this._bricks) {
      brick.draw();
    }

    this.ball.body.draw();
    this.paddle.body.draw();
    for (const brick of this._bricks) {
      brick.body.draw();
    }
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
