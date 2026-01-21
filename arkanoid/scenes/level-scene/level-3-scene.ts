import LevelScene from "./level-scene.ts";
import level3Data from "./level3.txt" with { type: "text" };

export default class Level3Scene extends LevelScene {
  constructor() {
    super(level3Data);
  }

  override getNextLevelName(): string {
    return "game-over";
  }
}
