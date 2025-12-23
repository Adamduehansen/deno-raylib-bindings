import {
  getFrameTime,
  type RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { vec } from "./vector.ts";
import type { Body } from "./physics.ts";

export abstract class Entity {
  pos: RaylibVector = vec(0, 0);
  vel: RaylibVector = vec(0, 0);

  width: number = 0;
  height: number = 0;

  body?: Body;

  update(): void {
    this.pos.x += this.vel.x * getFrameTime();
    this.pos.y += this.vel.y * getFrameTime();
    this.body?.update();
  }

  abstract draw(): void;

  postDraw(): void {
    this.body?.draw();
  }
}
