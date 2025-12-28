import { EventEmitter, type Game } from "@adamduehansen/engine";
import type { Entity } from "./entity.ts";

class EntityCollection {
  private _entities: Entity[] = [];
  private _scene: Scene;

  get length(): number {
    return this._entities.length;
  }

  constructor(scene: Scene) {
    this._scene = scene;
  }

  add(entity: Entity): void {
    this._entities.push(entity);
    entity.initialize(this._scene);
  }

  find(name: string): Entity | undefined {
    return this._entities.find((entity) => entity.name === name);
  }

  filter(predicate: (entity: Entity) => boolean) {
    return this._entities.filter(predicate);
  }

  remove(id: number): void {
    this._entities = this._entities.filter((entity) => entity.id !== id);
  }

  [Symbol.iterator]() {
    let index = 0;
    const entities = this._entities;

    return {
      index: 0,
      next(): IteratorResult<Entity> {
        if (index < entities.length) {
          return {
            value: entities[index++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  }
}

export abstract class Scene {
  entities = new EntityCollection(this);
  events = new EventEmitter();

  // deno-lint-ignore no-unused-vars
  initialize(game: Game): void {
    for (const entity of this.entities) {
      entity.initialize(this);
    }
  }

  update(): void {
    for (const entity of this.entities) {
      entity.update(this);
    }
  }

  draw(): void {
    for (const entity of this.entities) {
      entity.draw();
    }
  }
}
