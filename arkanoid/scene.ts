import { EventEmitter } from "@adamduehansen/raylib-bindings";
import { Ball, Brick, Paddle } from "./entities.ts";
import { isKeyPressed, KeySpace } from "@adamduehansen/raylib-bindings/r-core";
import level from "./level.txt" with { type: "text" };
import { vec } from "./vector.ts";

abstract class Scene {
  abstract initialize(): void;
  abstract update(): void;
  abstract draw(): void;
}

// GameScene
// ----------------------------------------------------------------------------

interface ParsedLevel {
  bricks: Brick[];
}

export class GameScene extends Scene {
  readonly paddle = new Paddle();
  readonly ball = new Ball();

  private _bricks: Brick[] = [];
  private _isActive = false;

  get bricks(): readonly Brick[] {
    return this._bricks;
  }

  private get _hasNoBricksLeft(): boolean {
    return this._bricks.length === 0;
  }

  readonly events = new EventEmitter<{
    "activate": undefined;
    "game_over": { score: number };
    "brick_destroyed": { id: number };
  }>();

  override initialize(): void {
    // Initialize game objects.
    this.paddle.initialize(this);
    this.ball.initialize(this);
    const { bricks } = this._parseLevelData(level);
    this._bricks = bricks;

    for (const brick of this._bricks) {
      brick.initialize(this);
    }

    // Initialize event listeners
    this.events.on("brick_destroyed", (data) => {
      this._bricks = this._bricks.filter((brick) => brick.id !== data?.id);

      if (this._hasNoBricksLeft) {
        console.log("All bricks are destroyed!");
      }
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

  private _parseLevelData(levelData: string): ParsedLevel {
    const bricks: Brick[] = [];
    const rows = levelData.split("\n");
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const column = row[columnIndex];

        if (column === "=") {
          const brick = new Brick();
          const { height, width } = brick.body.getBounds();
          brick.pos = vec(
            columnIndex * width + width / 2,
            rowIndex * height + height / 2,
          );
          bricks.push(brick);
        }
      }
    }

    return {
      bricks: bricks,
    };
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
