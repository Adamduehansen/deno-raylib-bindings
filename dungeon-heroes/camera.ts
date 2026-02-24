import {
  getMousePosition,
  getScreenHeight,
  getScreenWidth,
  isKeyDown,
  KeyDown,
  KeyLeft,
  KeyRight,
  KeyUp,
  RaylibCamera,
  RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";

const MOUSE_MARGIN_SCROLL_OFFSET = 50;
const KEYBOARD_SPEED = 5;
const MOUSE_SPEED = 2;

interface CameraControlStrategy {
  update(cameraTarget: RaylibVector): void;
}

class MouseCameraControl implements CameraControlStrategy {
  update(cameraTarget: RaylibVector): void {
    const mousePosition = getMousePosition();
    if (mousePosition.x < MOUSE_MARGIN_SCROLL_OFFSET) {
      cameraTarget.x -= MOUSE_SPEED;
    } else if (
      mousePosition.x > getScreenWidth() - MOUSE_MARGIN_SCROLL_OFFSET
    ) {
      cameraTarget.x += MOUSE_SPEED;
    }
    if (mousePosition.y < MOUSE_MARGIN_SCROLL_OFFSET) {
      cameraTarget.y -= MOUSE_SPEED;
    } else if (
      mousePosition.y > getScreenHeight() - MOUSE_MARGIN_SCROLL_OFFSET
    ) {
      cameraTarget.y += MOUSE_SPEED;
    }
  }
}

class KeyboardCameraControl implements CameraControlStrategy {
  update(cameraTarget: RaylibVector): void {
    if (isKeyDown(KeyLeft)) {
      cameraTarget.x -= KEYBOARD_SPEED;
    } else if (isKeyDown(KeyRight)) {
      cameraTarget.x += KEYBOARD_SPEED;
    }

    if (isKeyDown(KeyUp)) {
      cameraTarget.y -= KEYBOARD_SPEED;
    } else if (isKeyDown(KeyDown)) {
      cameraTarget.y += KEYBOARD_SPEED;
    }
  }
}

export default class Camera {
  readonly raylibCamera: RaylibCamera;
  private _cameraTarget: RaylibVector = {
    x: 100,
    y: 100,
  };
  private _controls: CameraControlStrategy[];

  constructor() {
    this.raylibCamera = {
      target: this._cameraTarget,
      offset: {
        x: getScreenWidth() / 2,
        y: getScreenHeight() / 2,
      },
      rotation: 0,
      zoom: 2,
    };
    this._controls = [
      new MouseCameraControl(),
      new KeyboardCameraControl(),
    ];
  }

  update(): void {
    for (const control of this._controls) {
      control.update(this._cameraTarget);
    }
  }
}
