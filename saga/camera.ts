import {
  beginMode2D,
  endMode2D,
  getScreenHeight,
  getScreenWidth,
  type RaylibCamera,
} from "@adamduehansen/raylib-bindings/r-core";
import type { Entity } from "./entity.ts";

interface CameraStrategy {
  update(camera: RaylibCamera): void;
}

export class FollowEntityStrategy implements CameraStrategy {
  constructor(readonly entity: Entity) {}

  update(camera: RaylibCamera): void {
    camera.target = this.entity.position;
    camera.offset = {
      x: getScreenWidth() / 2,
      y: getScreenHeight() / 2,
    };
  }
}

export class Camera {
  strategy?: CameraStrategy;

  set zoom(value: number) {
    this._raylibCamera.zoom = value;
  }

  private _raylibCamera: RaylibCamera;

  constructor() {
    this._raylibCamera = {
      target: {
        x: 0,
        y: 0,
      },
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      zoom: 1,
    };
  }

  update() {
    this.strategy?.update(this._raylibCamera);
  }

  beginRender(): void {
    beginMode2D(this._raylibCamera);
  }

  endRender(): void {
    endMode2D();
  }
}
