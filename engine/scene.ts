import { EventEmitter, type Game } from "@adamduehansen/engine";
import type { Entity } from "./entity.ts";
import { getKeyPressed } from "@adamduehansen/raylib-bindings/r-core";

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
    entity.onInitialize(this._scene);
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
    const entities = this._entities.toSorted((a, b) => a.z - b.z);

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
  private _game!: Game;

  get game(): Game {
    return this._game;
  }

  readonly entities = new EntityCollection(this);
  readonly events = new EventEmitter<
    {
      "activated": () => void;
      "deactivated": () => void;
    }
  >();

  /**
   * The {@linkcode onActivate} hook is called after the scene is switched to.
   */
  // deno-lint-ignore no-unused-vars
  onActivate(scene: Scene): void {}

  /**
   * The {@linkcode onDeactivated} hook is called before the scene is switched from.
   */
  onDeactivated(): void {}

  onInitialize(game: Game): void {
    this._game = game;
  }

  onUpdate(): void {
    // Handle keyboard events
    const keyPressed = getKeyPressed();
    if (keyPressed !== 0) {
      this.onKeyPress(keyPressed, this);
    }

    // Check collision
    this._handleCollision();

    // Update entities
    for (const entity of this.entities) {
      entity.onUpdate(this);
    }
  }

  onDraw(): void {
    for (const entity of this.entities) {
      entity.onDraw();
    }
  }

  // deno-lint-ignore no-unused-vars
  onKeyPress(key: number, scene: Scene): void {}

  // deno-lint-ignore no-unused-vars
  onKeyDown(key: number): void {}

  private _handleCollision(): void {
    for (const currentEntity of this.entities) {
      const currentEntityBody = currentEntity.body;
      if (currentEntityBody === undefined) {
        continue;
      }

      for (const otherEntity of this.entities) {
        if (currentEntity.id === otherEntity.id) {
          // Dont check for the same entity.
          continue;
        }

        const otherEntityBody = otherEntity.body;
        if (otherEntityBody === undefined) {
          continue;
        }
      }
    }
  }
}
