import { isKeyPressed, KeySpace } from "@adamduehansen/raylib-bindings/r-core";
import { RectangleBody, Scene, vec } from "@adamduehansen/engine";
import level from "./level.txt" with { type: "text" };
import Paddle from "./entities/paddle.ts";
import Brick from "./entities/brick.ts";
import Ball from "./entities/ball.ts";

// GameScene
// ----------------------------------------------------------------------------

interface ParsedLevel {
  bricks: Brick[];
}

export class GameScene extends Scene {
  readonly paddle = new Paddle();
  readonly ball = new Ball();

  private _bricks: Brick[] = this._parseLevelData(level).bricks;
  private _isActive = false;

  get bricks(): readonly Brick[] {
    return this._bricks;
  }

  private get _hasNoBricksLeft(): boolean {
    return this.entities.filter((entity) =>
      entity.name !== undefined && entity.name?.includes("brick")
    ).length === 0;
  }

  override initialize(): void {
    super.initialize();

    this.entities.add(this.paddle);
    this.entities.add(this.ball);
    for (const brick of this._bricks) {
      this.entities.add(brick);
    }

    // Initialize event listeners
    this.events.on("brick_destroyed", (data) => {
      if (typeof data !== "number") {
        return;
      }

      this.entities.remove(data);

      if (this._hasNoBricksLeft) {
        console.log("All bricks are destroyed!");
      }
    });
  }

  override update(): void {
    super.update();

    if (isKeyPressed(KeySpace) && this._isActive === false) {
      this._isActive = true;
      this.events.emit("activate");
    }
  }

  override draw(): void {
    super.draw();
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
          const { height, width } = (brick.body as RectangleBody).getBounds();
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
