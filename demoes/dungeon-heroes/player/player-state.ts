import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { GameContext } from "../game-context.ts";
import { DemoLevel } from "../level.ts";
import { Player } from "./player.ts";
import { InputController } from "./input-controller.ts";

export abstract class PlayerState {
  constructor(readonly player: Player) {}

  abstract handleInput(inputController: InputController): void;
  abstract update(level: DemoLevel): PlayerState | null;
}

abstract class MoveCommand {
  constructor(readonly player: Player) {}
  abstract execute(): RaylibVector;
}

class MoveRightCommand extends MoveCommand {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x + this.player.sprite.width,
    };
  }
}

class MoveLeftCommand extends MoveCommand {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x - this.player.sprite.width,
    };
  }
}

class MoveUpCommand extends MoveCommand {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y - this.player.sprite.height,
    };
  }
}

class MoveDownCommand extends MoveCommand {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y + this.player.sprite.height,
    };
  }
}

export class IdleState extends PlayerState {
  private _rightActionPressedCommand = new MoveRightCommand(this.player);
  private _leftActionPressedCommand = new MoveLeftCommand(this.player);
  private _upActionPressedCommand = new MoveUpCommand(this.player);
  private _downActionPressedCommand = new MoveDownCommand(this.player);
  private _nextPosition?: RaylibVector;

  override handleInput(inputController: InputController): void {
    if (inputController.isRightPressed()) {
      this._nextPosition = this._rightActionPressedCommand.execute();
    } else if (inputController.isLeftPressed()) {
      this._nextPosition = this._leftActionPressedCommand.execute();
    } else if (inputController.isUpPressed()) {
      this._nextPosition = this._upActionPressedCommand.execute();
    } else if (inputController.isDownPressed()) {
      this._nextPosition = this._downActionPressedCommand.execute();
    }
  }

  override update(level: DemoLevel): PlayerState | null {
    if (this._nextPosition === undefined) {
      return null;
    }

    if (!level.canMoveToPosition(this._nextPosition) && !GameContext.isNoclip) {
      return null;
    }

    return new MovingState(this.player, this._nextPosition);
  }
}

const PLAYER_SPEED = 2;

export class MovingState extends PlayerState {
  constructor(
    player: Player,
    private _positionToMoveTo: RaylibVector,
  ) {
    super(player);
  }

  override handleInput(_inputController: InputController): void {}

  override update(): PlayerState | null {
    if (this._positionToMoveTo.x !== this.player.position.x) {
      this.player.flipHorizontal =
        this._positionToMoveTo.x < this.player.position.x;

      this.player.position.x +=
        this._positionToMoveTo.x > this.player.position.x
          ? PLAYER_SPEED
          : -PLAYER_SPEED;
    }
    if (this._positionToMoveTo.y !== this.player.position.y) {
      this.player.position.y +=
        this._positionToMoveTo.y > this.player.position.y
          ? PLAYER_SPEED
          : -PLAYER_SPEED;
    }

    if (
      this._positionToMoveTo.x === this.player.position.x &&
      this._positionToMoveTo.y === this.player.position.y
    ) {
      return new IdleState(this.player);
    }

    return null;
  }
}
