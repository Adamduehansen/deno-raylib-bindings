import {
  getFrameTime,
  RaylibVector,
} from "@adamduehansen/raylib-bindings/r-core";
import { GameContext } from "../../../saga/game-context.ts";
import { Player } from "./player.ts";
import { InputController } from "./input-controller.ts";
import { GameScene } from "../../scenes/game-scene.ts";
import Tp from "../../entities/tp.ts";
import { Logger } from "@adamduehansen/saga";

export abstract class PlayerState {
  constructor(readonly player: Player) {}

  abstract update(
    inputController: InputController,
    room: GameScene,
  ): PlayerState | null;

  // deno-lint-ignore no-unused-vars
  enter(room: GameScene): void {}
}

abstract class PlayerCommand<TExecuteReturn = void> {
  constructor(readonly player: Player) {}
  abstract execute(): TExecuteReturn;
}

class MoveRightCommand extends PlayerCommand<RaylibVector> {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x + 16,
    };
  }
}

class MoveLeftCommand extends PlayerCommand<RaylibVector> {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x - 16,
    };
  }
}

class MoveUpCommand extends PlayerCommand<RaylibVector> {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y - 16,
    };
  }
}

class MoveDownCommand extends PlayerCommand<RaylibVector> {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y + 16,
    };
  }
}

class TurningState extends PlayerState {
  private _framesSpendTurning = 0;

  constructor(player: Player) {
    super(player);
    this.player.flipHorizontal = !this.player.flipHorizontal;
  }

  override update(): PlayerState | null {
    if (this._framesSpendTurning === 2) {
      return new IdleState(this.player);
    }

    this._framesSpendTurning += 1;
    return null;
  }
}

export class IdleState extends PlayerState {
  private _rightActionDownCommand = new MoveRightCommand(this.player);
  private _leftActionDownCommand = new MoveLeftCommand(this.player);
  private _upActionDownCommand = new MoveUpCommand(this.player);
  private _downActionDownCommand = new MoveDownCommand(this.player);

  private _nextPosition?: RaylibVector;

  override update(
    inputController: InputController,
    room: GameScene,
  ): PlayerState | null {
    if (inputController.isRightPressed()) {
      if (this.player.flipHorizontal === true) {
        return new TurningState(this.player);
      }
      this._nextPosition = this._rightActionDownCommand.execute();
    }
    if (inputController.isLeftPressed()) {
      if (this.player.flipHorizontal === false) {
        return new TurningState(this.player);
      } else {
        this._nextPosition = this._leftActionDownCommand.execute();
      }
    }
    if (inputController.isUpPressed()) {
      this._nextPosition = this._upActionDownCommand.execute();
    }
    if (inputController.isDownPressed()) {
      this._nextPosition = this._downActionDownCommand.execute();
    }

    if (this._nextPosition === undefined) {
      return null;
    }

    if (!room.canMoveToPosition(this._nextPosition) && !GameContext.isNoclip) {
      return null;
    }

    Logger.getInstance().debug(
      "PLAYER:",
      "Next player position: {",
      this._nextPosition.x.toString(),
      ", ",
      this._nextPosition.y.toString(),
      "}",
    );

    return new MovingState(this.player, this._nextPosition);
  }

  override enter(room: GameScene): void {
    const tp = room.entities.find((entity) =>
      entity instanceof Tp && this.player.position.x === entity.position.x &&
      this.player.position.y === entity.position.y
    ) as Tp;
    if (tp === undefined || tp.discovered) {
      return;
    }

    Logger.getInstance().debug("Unlocking new room", tp.id.toString());
    tp.discover();

    this.player.scene?.events.emit("add_map", this.player.position);
  }
}

const PLAYER_SPEED = 60;

export class MovingState extends PlayerState {
  constructor(
    player: Player,
    private _positionToMoveTo: RaylibVector,
  ) {
    super(player);
  }

  override update(): PlayerState | null {
    const { position } = this.player;

    // Move right
    if (position.x < this._positionToMoveTo.x) {
      this.player.flipHorizontal = false;
      position.x += PLAYER_SPEED * getFrameTime();
      if (position.x > this._positionToMoveTo.x) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    // Move left
    if (position.x > this._positionToMoveTo.x) {
      this.player.flipHorizontal = true;
      position.x -= PLAYER_SPEED * getFrameTime();
      if (position.x < this._positionToMoveTo.x) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    // Move up
    if (position.y > this._positionToMoveTo.y) {
      position.y -= PLAYER_SPEED * getFrameTime();
      if (position.y < this._positionToMoveTo.y) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    // Move down
    if (position.y < this._positionToMoveTo.y) {
      position.y += PLAYER_SPEED * getFrameTime();
      if (position.y > this._positionToMoveTo.y) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    return null;
  }
}
