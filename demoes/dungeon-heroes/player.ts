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
  type RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "./core/entity.ts";
import { Sprite } from "./core/sprite.ts";
import { Resources } from "./resources.ts";
import { DemoLevel } from "./level.ts";
import { GameContext } from "./game-context.ts";

interface PlayerArgs {
  position: RaylibVector;
  level: DemoLevel;
}

class InputController {
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

export class Player extends Entity {
  private _isMoving = false;
  private _inputController = new InputController();

  private _level: DemoLevel;

  private positionToMoveTo?: RaylibVector;

  constructor({ position, level }: PlayerArgs) {
    super({
      sprite: new Sprite(Resources.knight.texture!),
      position: position,
    });
    this._level = level;
  }

  override update(): void {
    this._handleInput();
    this._movePosition();
  }

  private _canMoveToPosition(nextPosition: RaylibVector): boolean {
    return this._level.canMoveToPosition(nextPosition) || GameContext.isNoclip;
  }

  private _handleInput(): void {
    if (this._isMoving === true) {
      return;
    }

    if (this._inputController.isRightPressed()) {
      const nextPosition: RaylibVector = {
        ...this.position,
        x: this.position.x + this.sprite.width,
      };

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this.positionToMoveTo = nextPosition;
    }

    if (this._inputController.isLeftPressed()) {
      const nextPosition: RaylibVector = {
        ...this.position,
        x: this.position.x - this.sprite.width,
      };

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this.positionToMoveTo = nextPosition;
    }

    if (this._inputController.isUpPressed()) {
      const nextPosition: RaylibVector = {
        ...this.position,
        y: this.position.y - this.sprite.height,
      };

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this.positionToMoveTo = nextPosition;
    }

    if (this._inputController.isDownPressed()) {
      const nextPosition: RaylibVector = {
        ...this.position,
        y: this.position.y + this.sprite.height,
      };

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this.positionToMoveTo = nextPosition;
    }
  }

  private _movePosition(): void {
    if (this.positionToMoveTo === undefined) {
      return;
    }

    if (this.positionToMoveTo.x !== this.position.x) {
      this.position.x += this.positionToMoveTo.x > this.position.x ? 2 : -2;
    }
    if (this.positionToMoveTo.y !== this.position.y) {
      this.position.y += this.positionToMoveTo.y > this.position.y ? 2 : -2;
    }

    if (
      this.positionToMoveTo.x === this.position.x &&
      this.positionToMoveTo.y === this.position.y
    ) {
      this.positionToMoveTo = undefined;
      this._isMoving = false;
    }
  }
}
