import { type RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "../../core/entity.ts";
import { Sprite } from "../../core/sprite.ts";
import { Resources } from "../../resources.ts";
import { IdleState, PlayerState } from "./player-state.ts";
import { InputController } from "./input-controller.ts";
import { GameScene } from "../../scenes/game-scene.ts";

interface PlayerArgs {
  position: RaylibVector;
  scene: GameScene;
}

export class Player extends Entity {
  private _inputController = new InputController();

  private _state: PlayerState = new IdleState(this);

  private readonly _gameScene: GameScene;

  constructor({ position, scene }: PlayerArgs) {
    super({
      sprite: new Sprite(Resources.knight.texture!),
      position: position,
      z: 2,
    });
    this._gameScene = scene;
  }

  override update(): void {
    const nextState = this._state.update(
      this._inputController,
      this._gameScene,
    );

    if (nextState === null) {
      return;
    }

    this._state = nextState;
    this._state.enter(this._gameScene);
  }
}
