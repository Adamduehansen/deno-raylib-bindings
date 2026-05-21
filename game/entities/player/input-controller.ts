import {
  isKeyDown,
  isKeyPressed,
  isKeyReleased,
  KeyA,
  KeyD,
  KeyDown,
  KeyLeft,
  KeyRight,
  KeyS,
  KeyUp,
  KeyW,
} from "@adamduehansen/raylib-bindings/r-core";

const NUMBER_OF_FRAMES_BEFORE_IS_DOWN = 5;

export class InputController {
  private _timeDown = 0;

  update(): void {
    if (
      isKeyReleased(KeyD) || isKeyReleased(KeyRight) || isKeyReleased(KeyA) ||
      isKeyReleased(KeyLeft)
    ) {
      this._timeDown = 0;
    }
  }

  isRightPressed(): boolean {
    return isKeyPressed(KeyRight) || isKeyPressed(KeyD);
  }

  isRightDown(): boolean {
    if (isKeyDown(KeyRight) || isKeyDown(KeyD)) {
      this._timeDown += 1;
    }
    return (isKeyDown(KeyRight) ||
      isKeyDown(KeyD)) && this._timeDown > NUMBER_OF_FRAMES_BEFORE_IS_DOWN;
  }

  isLeftPressed(): boolean {
    return isKeyPressed(KeyLeft) || isKeyPressed(KeyA);
  }

  isLeftDown(): boolean {
    if (isKeyDown(KeyLeft) || isKeyDown(KeyA)) {
      this._timeDown += 1;
    }
    return (isKeyDown(KeyLeft) ||
      isKeyDown(KeyA)) && this._timeDown > NUMBER_OF_FRAMES_BEFORE_IS_DOWN;
  }

  isUpPressed(): boolean {
    return isKeyDown(KeyUp) || isKeyDown(KeyW);
  }

  isDownPressed(): boolean {
    return isKeyDown(KeyDown) || isKeyDown(KeyS);
  }
}
