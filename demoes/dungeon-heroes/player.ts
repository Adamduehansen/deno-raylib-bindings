import {
  isKeyDown,
  isKeyPressed,
  KeyDown,
  KeyLeft,
  KeyRight,
  KeyUp,
  type RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "./core/entity.ts";
import { Sprite } from "./core/sprite.ts";
import { Resources } from "./resources.ts";
import { DemoLevel } from "./level.ts";

interface PlayerArgs {
  position: RaylibVector;
  level: DemoLevel;
}

export class Player extends Entity {
  private _isMoving = false;

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

  private _handleInput(): void {
    if (this._isMoving === true) {
      return;
    }

    if (isKeyDown(KeyRight)) {
      const nextPosition: RaylibVector = {
        ...this.position,
        x: this.position.x + this.sprite.width,
      };

      if (this._level.canMoveToPosition(nextPosition) === false) {
        return;
      }

      this._isMoving = true;
      this.positionToMoveTo = nextPosition;
    }

    if (isKeyDown(KeyLeft)) {
      const nextPosition: RaylibVector = {
        ...this.position,
        x: this.position.x - this.sprite.width,
      };

      if (this._level.canMoveToPosition(nextPosition) === false) {
        return;
      }

      this._isMoving = true;
      this.positionToMoveTo = nextPosition;
    }

    if (isKeyDown(KeyUp)) {
      const nextPosition: RaylibVector = {
        ...this.position,
        y: this.position.y - this.sprite.height,
      };

      if (this._level.canMoveToPosition(nextPosition) === false) {
        return;
      }

      this._isMoving = true;
      this.positionToMoveTo = nextPosition;
    }

    if (isKeyDown(KeyDown)) {
      const nextPosition: RaylibVector = {
        ...this.position,
        y: this.position.y + this.sprite.height,
      };

      if (this._level.canMoveToPosition(nextPosition) === false) {
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
