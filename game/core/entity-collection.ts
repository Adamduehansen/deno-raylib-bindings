import { Entity } from "./entity.ts";
import { Scene } from "./scene.ts";

export class EntityCollection {
  private _entities: Entity[] = [];
  private _scene: Scene;

  get length(): number {
    return this._entities.length;
  }

  constructor(scene: Scene) {
    this._scene = scene;
  }

  /**
   * Adds an entity to the collection.
   *
   * @param entity The entity to add
   */
  add(entity: Entity): void {
    this._entities.push(entity);
    entity.scene = this._scene;
  }

  /**
   * Gets an entity by the id of the entity. If none is found, `undefined` will
   * be returned.
   *
   * @param entityId Tne id of the entity you want to find.
   * @returns The entity or undefined if not found.
   */
  get(entityId: number): Entity | undefined {
    return this._entities.find((entity) => entity.id === entityId);
  }

  find(predicate: (entity: Entity) => boolean) {
    return this._entities.find(predicate);
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
