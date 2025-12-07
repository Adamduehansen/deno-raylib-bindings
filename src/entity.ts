import GraphicsComponent from "./components/graphic-component.ts";
import { vec } from "./math.ts";
import Scene from "./scene.ts";

let entityIdentifier = 0;

export default abstract class Entity {
  readonly id = entityIdentifier++;
  readonly name?: string;

  pos = vec(0, 0);

  graphics = new GraphicsComponent(this);

  /**
   * Called once the entity is added to a scene.
   *
   * @param scene The scene the entity is initialized to.
   */
  // deno-lint-ignore no-unused-vars
  onInitialize(scene: Scene): void {}

  /**
   * Called when the entity is removed from a scene.
   *
   * @param scene The scene the entity is removed from.
   */
  // deno-lint-ignore no-unused-vars
  onRemoved(scene: Scene): void {}

  render(): void {
    this.graphics.render();
  }
}
