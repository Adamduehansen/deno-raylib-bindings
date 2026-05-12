import { type RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "../core/entity.ts";
import { Sprite } from "../core/sprite.ts";
import { Resources } from "../resources.ts";
import { IdleState, PlayerState } from "./player-state.ts";
import { InputController } from "./input-controller.ts";
import { Room } from "../rooms/room.ts";

interface PlayerArgs {
  position: RaylibVector;
  level: Room;
}

export class Player extends Entity {
  private _inputController = new InputController();

  private _state: PlayerState = new IdleState(this);

  private readonly _room: Room;

  constructor({ position, level }: PlayerArgs) {
    super({
      sprite: new Sprite(Resources.knight.texture!),
      position: position,
    });
    this._room = level;
  }

  override update(): void {
    this._state.handleInput(this._inputController);
    const nextState = this._state.update(this._room);

    if (nextState === null) {
      return;
    }

    this._state = nextState;
    this._state.enter(this._room);
  }
}
