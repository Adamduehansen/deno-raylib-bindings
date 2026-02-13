import { EntityCollection } from "./entity-collection.ts";
import Logger, { DefaultLogger } from "./logger.ts";
import System from "./system.ts";

interface GameContextArgs {
  title: string;
  width: number;
  height: number;
}

export default abstract class GameContext {
  width = 0;
  height = 0;
  title = "";

  readonly entityCollection = new EntityCollection();

  protected logger: Logger = new DefaultLogger();

  readonly systems: readonly System[] = [];

  constructor(args: GameContextArgs) {
    this.title = args.title;
    this.width = args.width;
    this.height = args.height;

    this.systems = this.getSystems();
  }

  /**
   * This method will be called once during {@linkcode Game.init}
   */
  onInitialize(): void {}

  /**
   * This method will be called once each frame.
   */
  onUpdate(): void {}

  abstract getSystems(): System[];
}
