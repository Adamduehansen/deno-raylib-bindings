import Game from "./game.ts";

export default abstract class Scene {
  /**
   * Called once when the scene is added to the game. USe this to setup entities
   * that needs to live across scene changes.
   *
   * @param game the current instance of the game.
   */
  // deno-lint-ignore no-unused-vars
  onInitialize(game: Game): void {}

  /**
   * Called when a scene is switched to. Use this method to setup the entities
   * of the scene.
   */
  onActivate(): void {}

  /**
   * Called on each tick of the game.
   *
   * @param game the current instance of the game.
   */
  // deno-lint-ignore no-unused-vars
  onUpdate(game: Game): void {
  }

  /**
   * Called on each tick of the game.
   */
  onRender(): void {
  }
}
