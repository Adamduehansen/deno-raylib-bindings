import { vec } from "../engine/vector.ts";
import Brick from "./scenes/level-scene/brick.ts";

interface LevelData {
  bricks: Brick[];
}

export interface LevelParser {
  parse(): LevelData;
}

export class TextLevelParser implements LevelParser {
  constructor(readonly levelData: string) {}

  parse(): LevelData {
    const bricks: Brick[] = [];

    const rows = this.levelData.split("\n");
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const column = row[columnIndex];

        if (column === "=") {
          const brick = new Brick();
          const { height, width } = brick;
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
