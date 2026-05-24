import {
  getScreenHeight,
  getScreenWidth,
  RaylibCamera,
} from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "./entity.ts";

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

  private _camera: RaylibCamera;

  get nativeCamera(): RaylibCamera {
    return this._camera;
  }

  constructor() {
    this._camera = {
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
    this.strategy?.update(this._camera);
  }
}
