import { Entity } from "./entity.ts";

export abstract class Scene {
  #entities: Entity[] = [];

  add(entity: Entity): void {
    this.#entities.push(entity);
  }

  update(): void {
    for (const entity of this.#entities) {
      entity.update();
    }
  }

  render(): void {
    for (const entity of this.#entities) {
      entity.render();
    }
  }
}
