import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "../core/entity.ts";
import { Sprite } from "../core/sprite.ts";
import { Resources } from "../resources.ts";
import { Room1 } from "../rooms/room1.ts";
import { GhostState, IdleState } from "./ghost-state.ts";

const MOVE_COUNTDOWN = 0.2;
// const SPEED = 5;

interface Args {
  position: RaylibVector;
  level: Room1;
}

export class Ghost extends Entity {
  private _level: Room1;

  private _positionToMoveTo?: RaylibVector;

  private _moveCountdown = MOVE_COUNTDOWN;
  private _state: GhostState = new IdleState(this);

  constructor({ position, level }: Args) {
    super({
      sprite: new Sprite(Resources.ghost.texture!),
      position: position,
    });
    this._level = level;
  }

  override update(): void {
    this._state.update();
    // this._setNewPosition();
    // this._moveCountdown -= getFrameTime();
    // this._movePosition();
  }

  // private _setNewPosition() {
  //   if (this._positionToMoveTo === undefined && this._moveCountdown <= 0) {
  //     const newX = this.position.x +
  //       (Math.floor(Math.random() * 2) === 1 ? 1 : -1);
  //     this._positionToMoveTo = {
  //       x: newX,
  //       y: this.position.y,
  //     };
  //     this._moveCountdown = MOVE_COUNTDOWN;
  //   }
  // }

  // private _movePosition() {
  //   if (this._positionToMoveTo === undefined) {
  //     return;
  //   }

  //   if (this._positionToMoveTo.x !== this.position.x) {
  //     this.flipHorizontal = this._positionToMoveTo.x < this.position.x;
  //     this.position.x += this._positionToMoveTo.x > this.position.x
  //       ? SPEED * getFrameTime()
  //       : -SPEED * getFrameTime();
  //   }
  //   if (this._positionToMoveTo.y !== this.position.y) {
  //     this.position.y += this._positionToMoveTo.y > this.position.y
  //       ? SPEED * getFrameTime()
  //       : -SPEED * getFrameTime();
  //   }

  //   if (
  //     this._positionToMoveTo.x === this.position.x &&
  //     this._positionToMoveTo.y === this.position.y
  //   ) {
  //     this._positionToMoveTo = undefined;
  //   }
  // }
}
