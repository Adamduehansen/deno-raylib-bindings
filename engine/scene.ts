import { EventEmitter, type Game } from "@adamduehansen/engine";
import type { Entity } from "./entity.ts";
import { getKeyPressed } from "@adamduehansen/raylib-bindings/r-core";
import { checkCollisionCircles } from "@adamduehansen/raylib-bindings/r-shapes";
import { CircleBody } from "./physics.ts";
import Vector2, { vec } from "./vector.ts";

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
          // Dont run for entity that has no body.
          continue;
        }

        if (
          currentEntityBody instanceof CircleBody &&
          otherEntityBody instanceof CircleBody &&
          checkCollisionCircles(
            currentEntityBody.centroid,
            currentEntityBody.radius,
            otherEntityBody.centroid,
            otherEntityBody.radius,
          )
        ) {
          const centroidA = currentEntityBody.centroid;
          const centroidB = otherEntityBody.centroid;

          const direction = Vector2.sub(centroidB, centroidA);
          const circleARadius = currentEntityBody.radius;
          const circleBRadius = otherEntityBody.radius;

          const sumRadius = circleARadius + circleBRadius;

          if (direction.length2() < sumRadius * sumRadius) {
            const directionLength = direction.length();
            const penetrationNormal = Vector2.scale(
              direction,
              1 / directionLength,
            );
            const penetrationDepth = directionLength - sumRadius;
            const penetrationPoint = Vector2.add(
              centroidA,
              Vector2.scale(penetrationNormal, circleARadius),
            );

            const depth = penetrationDepth * -1;
            const normal = penetrationNormal.clone();
            console.log(depth, normal);

            const push = Vector2.scale(normal, depth * 0.5);
            console.log(otherEntity.id, push);

            otherEntity.vel = push;
            // currentEntity.vel = Vector2.scale(push, -1);
          }
        }
      }
    }
  }
}
