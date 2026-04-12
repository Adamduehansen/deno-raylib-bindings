import { type RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "../core/entity.ts";
import { Sprite } from "../core/sprite.ts";
import { Resources } from "../resources.ts";
import { DemoLevel } from "../level.ts";
import { IdleState, PlayerState } from "./player-state.ts";
import { InputController } from "./input-controller.ts";

interface PlayerArgs {
  position: RaylibVector;
  level: DemoLevel;
}

export class Player extends Entity {
  private _inputController = new InputController();

  private _state: PlayerState;

  private readonly _level: DemoLevel;

  constructor({ position, level }: PlayerArgs) {
    super({
      sprite: new Sprite(Resources.knight.texture!),
      position: position,
    });
    this._level = level;
    this._state = new IdleState(this);
  }

  override update(): void {
    this._state.handleInput(this._inputController);
    const nextState = this._state.update(this._level);

    if (nextState === null) {
      return;
    }

    this._state = nextState;
  }
}
