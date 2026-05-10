import { RaylibCamera } from "@adamduehansen/raylib-bindings/r-core";

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
      zoom: 3,
    };
  }
}
