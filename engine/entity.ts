import { getFrameTime } from "@adamduehansen/raylib-bindings/r-core";
import Vector2, { vec } from "./vector.ts";
import type { Body } from "./physics.ts";
import type { Scene } from "./scene.ts";

let entityId = 0;

export abstract class Entity {
  pos = new Vector2(0, 0);
  vel = new Vector2(0, 0);
  z = 0;
  width = 0;
  height = 0;
  opacity = 1;
  name = "";

  readonly id = entityId++;

  body?: Body;

  // deno-lint-ignore no-unused-vars
  onInitialize(scene: Scene): void {}

  // deno-lint-ignore no-unused-vars
  onUpdate(scene: Scene): void {
    // Add the velocity vector to the position to move the entity.
    // If ECS is implemented this could be done in a PositionComponent.
    this.pos = this.pos.add(
      vec(this.vel.x * getFrameTime(), this.vel.y * getFrameTime()),
    );

    // Update body
    // If ECS is implemented this could be done in a PhysicsComponent.
    this.body?.update(
      vec(this.vel.x * getFrameTime(), this.vel.y * getFrameTime()),
    );
  }

  abstract onDraw(): void;

  onPostDraw(): void {
    this.body?.draw();
  }
}
