import DrawSystem from "../draw-system.ts";
import { EntityCollection } from "../entity-collection.ts";
import Logger, { DefaultLogger } from "./logger.ts";
import { ResourceMap } from "../resource.ts";
import System from "../system.ts";

interface GameContextArgs {
  title: string;
  width: number;
  height: number;
  targetFps?: number;
  resources?: ResourceMap;
}

export default abstract class GameContext {
  width: number;
  height: number;
  title: string;

  readonly targetFps: number;
  readonly resouces: ResourceMap;
  readonly debug: boolean;

  readonly entityCollection = new EntityCollection();

  protected logger: Logger = new DefaultLogger();

  readonly systems: readonly System[];

  constructor(args: GameContextArgs) {
    this.title = args.title;
    this.width = args.width;
    this.height = args.height;
    this.targetFps = args.targetFps ?? 60;
    this.resouces = args.resources ?? {};

    const cliArgs = Deno.args;
    this.debug = cliArgs.includes("--debug");

    this.systems = [...this.getSystems(), new DrawSystem(this)];
  }

  /**
   * This method will be called once during {@linkcode Game.init}
   */
  onInitialize(): void {}

  /**
   * Override this method to tell the game what systems are used. The systems
   * are executed in the order of the array.
   */
  getSystems(): System[] {
    return [];
  }
}
