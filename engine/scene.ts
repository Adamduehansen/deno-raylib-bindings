import { EventEmitter, type Game } from "@adamduehansen/engine";
import type { Entity } from "./entity.ts";
import { getKeyPressed } from "@adamduehansen/raylib-bindings/r-core";

class EntityCollection {
  private _entities: Entity[] = [];
  private _scene: Scene;
  private _game?: Game;

  get length(): number {
    return this._entities.length;
  }

  constructor(scene: Scene, game?: Game) {
    this._scene = scene;
    this._game = game;
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
  private _game?: Game;

  get game(): Game | undefined {
    return this._game;
  }

  readonly entities = new EntityCollection(this);
  readonly events = new EventEmitter();

  initialize(game: Game): void {
    this._game = game;
  }

  update(): void {
    // Handle keyboard events
    const keyPressed = getKeyPressed();
    if (keyPressed !== 0) {
      this.onKeyPress(keyPressed);
    }

    // Update entities
    for (const entity of this.entities) {
      entity.update(this);
    }
  }

  draw(): void {
    for (const entity of this.entities) {
      if (entity.hide) {
        continue;
      }

      entity.draw();
    }
  }

  // deno-lint-ignore no-unused-vars
  onKeyPress(key: number): void {}

  // deno-lint-ignore no-unused-vars
  onKeyDown(key: number): void {}
}
