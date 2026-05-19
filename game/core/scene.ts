import { EntityCollection } from "./entity-collection.ts";
import { Camera } from "./camera.ts";
import { Events } from "./event.ts";

export class Scene {
  readonly camera = new Camera();
  readonly entities = new EntityCollection(this);
  readonly events = new Events();

  update(): void {
    for (const entity of this.entities) {
      entity.update();
    }
  }

  /**
   * This method is called right before the game loop begins.
   */
  init(): void {}
}
