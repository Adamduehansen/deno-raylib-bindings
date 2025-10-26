import { Entity } from "./entity.ts";
import { EventEmitter } from "./event-emitter.ts";

class EntityManager {
  #entities: Entity[] = [];
  #scene: Scene;

  get entities(): readonly Entity[] {
    return this.#entities;
  }

  constructor(scene: Scene) {
    this.#scene = scene;
  }

  add(entity: Entity): void {
    entity.scene = this.#scene;
    entity.initialize();
    this.#entities.push(entity);
  }

  getByName(name: string): Entity[] {
    return this.#entities.filter((entity) => entity.name === name);
  }

  remove(entityToRemove: Entity): void {
    this.#entities = this.#entities.filter((entity) =>
      entity.id !== entityToRemove.id
    );
  }
}

export abstract class Scene {
  readonly entityManager: EntityManager = new EntityManager(this);

  eventEmitter: EventEmitter = new EventEmitter();

  update(): void {
    for (const entity of this.entityManager.entities) {
      entity.update();
    }
  }

  render(): void {
    for (const entity of this.entityManager.entities) {
      entity.render();
    }
  }
}
