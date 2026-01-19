import LevelScene from "./level-scene.ts";
import level1Data from "./level1.txt" with { type: "text" };

export default class Level1Scene extends LevelScene {
  constructor() {
    super(level1Data);
  }

  override getNextLevelName(): string {
    return "level-2";
  }
}
