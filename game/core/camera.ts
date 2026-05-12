import {
  getScreenHeight,
  getScreenWidth,
  RaylibCamera,
} from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "./entity.ts";

export class Camera {
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

  focus(entity: Entity) {
    this._camera.target = entity.position;
    this._camera.offset = {
      x: getScreenWidth() / 2,
      y: getScreenHeight() / 2,
    };
  }
}
