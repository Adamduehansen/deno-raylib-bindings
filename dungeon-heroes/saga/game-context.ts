import { EntityCollection } from "./entity-collection.ts";

export default abstract class GameContext {
  protected entityCollection = new EntityCollection();

  /**
   * This method will be called once during {@linkcode Game.init}
   */
  onInitialize(): void {}

  /**
   * This method will be called once each frame.
   */
  onUpdate(): void {}
}
