import {
  isKeyDown,
  KeyA,
  KeyD,
  KeyDown,
  KeyLeft,
  KeyRight,
  KeyS,
  KeyUp,
  KeyW,
} from "@adamduehansen/raylib-bindings/r-core";

export class InputController {
  isRightPressed(): boolean {
    return isKeyDown(KeyRight) || isKeyDown(KeyD);
  }

  isLeftPressed(): boolean {
    return isKeyDown(KeyLeft) || isKeyDown(KeyA);
  }

  isUpPressed(): boolean {
    return isKeyDown(KeyUp) || isKeyDown(KeyW);
  }

  isDownPressed(): boolean {
    return isKeyDown(KeyDown) || isKeyDown(KeyS);
  }
}
