import {
  getMousePosition,
  getMouseWheelMove,
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

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

interface CameraControlStrategy {
  update(cameraTarget: RaylibVector, zoom: number): [RaylibVector, number];
}

class MouseCameraControl implements CameraControlStrategy {
  update(cameraTarget: RaylibVector, zoom: number): [RaylibVector, number] {
    const newCameraTarget: RaylibVector = { ...cameraTarget };

    const mousePosition = getMousePosition();
    if (mousePosition.x < MOUSE_MARGIN_SCROLL_OFFSET) {
      newCameraTarget.x -= MOUSE_SPEED;
    } else if (
      mousePosition.x > getScreenWidth() - MOUSE_MARGIN_SCROLL_OFFSET
    ) {
      newCameraTarget.x += MOUSE_SPEED;
    }
    if (mousePosition.y < MOUSE_MARGIN_SCROLL_OFFSET) {
      newCameraTarget.y -= MOUSE_SPEED;
    } else if (
      mousePosition.y > getScreenHeight() - MOUSE_MARGIN_SCROLL_OFFSET
    ) {
      newCameraTarget.y += MOUSE_SPEED;
    }

    const mouseWheelDelta = getMouseWheelMove();

    const newZoom = clamp(zoom + mouseWheelDelta, ZOOM_MIN, ZOOM_MAX);

    return [newCameraTarget, newZoom];
  }
}

class KeyboardCameraControl implements CameraControlStrategy {
  update(cameraTarget: RaylibVector, zoom: number): [RaylibVector, number] {
    const newCameraTarget: RaylibVector = { ...cameraTarget };

    if (isKeyDown(KeyLeft)) {
      newCameraTarget.x -= KEYBOARD_SPEED;
    } else if (isKeyDown(KeyRight)) {
      newCameraTarget.x += KEYBOARD_SPEED;
    }

    if (isKeyDown(KeyUp)) {
      newCameraTarget.y -= KEYBOARD_SPEED;
    } else if (isKeyDown(KeyDown)) {
      newCameraTarget.y += KEYBOARD_SPEED;
    }

    return [newCameraTarget, zoom];
  }
}

interface Args {
  target?: RaylibVector;
  offset?: RaylibVector;
  rotation?: number;
  zoom?: number;
}

export default class Camera {
  readonly raylibCamera: RaylibCamera;
  private _controls: CameraControlStrategy[];

  constructor(args: Args) {
    this.raylibCamera = {
      target: args.target ?? { x: 0, y: 0 },
      offset: args.offset ?? { x: 0, y: 0 },
      rotation: args.rotation ?? 0,
      zoom: args.zoom ?? 0,
    };
    this._controls = [
      new MouseCameraControl(),
      new KeyboardCameraControl(),
    ];
  }

  update(): void {
    for (const control of this._controls) {
      const [newCameraTarget, zoom] = control.update(
        this.raylibCamera.target,
        this.raylibCamera.zoom,
      );
      this.raylibCamera.target = newCameraTarget;
      this.raylibCamera.zoom = zoom;
    }
  }
}
