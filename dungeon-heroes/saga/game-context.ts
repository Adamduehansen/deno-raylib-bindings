import { EntityCollection } from "./entity-collection.ts";
import Logger, { DefaultLogger } from "./logger.ts";
import System from "./system.ts";

interface GameContextArgs {
  title: string;
  width: number;
  height: number;
  targetFps?: number;
}

export default abstract class GameContext {
  width: number;
  height: number;
  title: string;

  readonly debug: boolean;
  readonly targetFps: number;

  readonly entityCollection = new EntityCollection();

  protected logger: Logger = new DefaultLogger();

  readonly systems: readonly System[] = [];

  constructor(args: GameContextArgs) {
    this.title = args.title;
    this.width = args.width;
    this.height = args.height;
    this.targetFps = args.targetFps ?? 60;

    const cliArgs = Deno.args;
    this.debug = cliArgs.includes("--debug");

    this.systems = this.getSystems();
  }

  /**
   * This method will be called once during {@linkcode Game.init}
   */
  onInitialize(): void {}

  /**
   * Tells the game what systems are used. The systems are executed in the order
   * of the array.
   */
  abstract getSystems(): System[];
}
