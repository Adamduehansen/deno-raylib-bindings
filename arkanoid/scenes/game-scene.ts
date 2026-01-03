import {
  isKeyPressed,
  KeySpace,
  LOG_INFO,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { Game, RectangleBody, Scene, vec } from "@adamduehansen/engine";
import level from "../level.txt" with { type: "text" };
import Paddle from "../entities/paddle.ts";
import Brick from "../entities/brick.ts";
import Ball from "../entities/ball.ts";

interface ParsedLevel {
  bricks: Brick[];
}

export class GameScene extends Scene {
  readonly paddle = new Paddle();
  readonly ball = new Ball();
  private _levelBricks = this._parseLevelData(level).bricks;
  private _isActive = false;

  private get _hasNoBricksLeft(): boolean {
    return this.entities.filter((entity) =>
      entity.name !== undefined && entity.name?.includes("brick")
    ).length === 0;
  }

  override initialize(game: Game): void {
    super.initialize(game);

    this.entities.add(this.paddle);
    this.entities.add(this.ball);

    // Initialize event listeners
    this.events.on("brick_destroyed", (data) => {
      if (typeof data !== "number") {
        return;
      }

      this.entities.remove(data);

      if (this._hasNoBricksLeft) {
        game.goToScene("end-scene");
      }
    });
  }

  override onActivate(): void {
    traceLog(LOG_INFO, "Game scene", "activated");
    this._isActive = false;
    for (const brick of this._levelBricks) {
      this.entities.add(brick);
    }
  }

  override onDisable(): void {
    traceLog(LOG_INFO, "Game scene destroyed");
    const remainingBricks = this.entities.filter((entity) =>
      entity.name !== undefined && entity.name.includes("brick")
    );
    for (const brick of remainingBricks) {
      this.entities.remove(brick.id);
    }
  }

  override update(): void {
    super.update();

    if (isKeyPressed(KeySpace) && this._isActive === false) {
      this._isActive = true;
      this.events.emit("activate");
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
