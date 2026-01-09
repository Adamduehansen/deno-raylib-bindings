import {
  getFrameTime,
  type RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { vec } from "./vector.ts";
import type { Body } from "./physics.ts";
import type { Scene } from "./scene.ts";

let entityId = 0;

export abstract class Entity {
  pos: RaylibVector = vec(0, 0);
  vel: RaylibVector = vec(0, 0);
  name = "";

  readonly id = entityId++;

  width = 0;
  height = 0;
  hide = false;

  body?: Body;

  // deno-lint-ignore no-unused-vars
  onInitialize(scene: Scene): void {}

  // deno-lint-ignore no-unused-vars
  onUpdate(scene: Scene): void {
    this.pos.x += this.vel.x * getFrameTime();
    this.pos.y += this.vel.y * getFrameTime();
    this.body?.update();
  }

  abstract onDraw(): void;

  onPostDraw(): void {
    this.body?.draw();
  }
}
