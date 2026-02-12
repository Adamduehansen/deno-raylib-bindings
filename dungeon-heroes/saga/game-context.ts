import { EntityCollection } from "./entity-collection.ts";

interface GameContextArgs {
  title: string;
  width: number;
  height: number;
}

export default abstract class GameContext {
  width = 0;
  height = 0;
  title = "";

  protected entityCollection = new EntityCollection();

  constructor(args: GameContextArgs) {
    this.title = args.title;
    this.width = args.width;
    this.height = args.height;
  }

  /**
   * This method will be called once during {@linkcode Game.init}
   */
  onInitialize(): void {}

  /**
   * This method will be called once each frame.
   */
  onUpdate(): void {}
}
