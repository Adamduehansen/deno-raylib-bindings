import LevelScene from "./level-scene.ts";
import level2Data from "./level2.txt" with { type: "text" };

export default class Level2Scene extends LevelScene {
  constructor() {
    super(level2Data);
  }
  override getNextLevelName(): string {
    return "level-3";
  }
}
