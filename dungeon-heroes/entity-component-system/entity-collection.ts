import { Entity } from "./entity.ts";

export class EntityCollection {
  private _entities: Entity[] = [];

  get length(): number {
    return this._entities.length;
  }

  add(entity: Entity): void {
    this._entities.push(entity);
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
