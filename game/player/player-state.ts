import {
  getFrameTime,
  LOG_DEBUG,
  RaylibVector,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { GameContext } from "../game-context.ts";
import { Room1 } from "../rooms/room1.ts";
import { Player } from "./player.ts";
import { InputController } from "./input-controller.ts";
import { vector2Scale } from "@adamduehansen/raylib-bindings/r-math";

export abstract class PlayerState {
  constructor(readonly player: Player) {}

  abstract handleInput(inputController: InputController): void;
  abstract update(level: Room1): PlayerState | null;
}

abstract class MoveCommand {
  constructor(readonly player: Player) {}
  abstract execute(): RaylibVector;
}

class MoveRightCommand extends MoveCommand {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x + 1,
    };
  }
}

class MoveLeftCommand extends MoveCommand {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x - 1,
    };
  }
}

class MoveUpCommand extends MoveCommand {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y - 1,
    };
  }
}

class MoveDownCommand extends MoveCommand {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y + 1,
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

  override update(level: Room1): PlayerState | null {
    if (this._nextPosition === undefined) {
      return null;
    }

    if (!level.canMoveToPosition(this._nextPosition) && !GameContext.isNoclip) {
      return null;
    }

    traceLog(
      LOG_DEBUG,
      "Next player position: {",
      this._nextPosition.x.toString(),
      ", ",
      this._nextPosition.y.toString(),
      "}",
    );

    return new MovingState(this.player, this._nextPosition);
  }
}

const PLAYER_SPEED = 5;

export class MovingState extends PlayerState {
  constructor(
    player: Player,
    private _positionToMoveTo: RaylibVector,
  ) {
    super(player);
  }

  override handleInput(_inputController: InputController): void {}

  override update(): PlayerState | null {
    const { position, worldPosition, sprite } = this.player;
    const nextWorldPosition = vector2Scale(
      this._positionToMoveTo,
      sprite.width,
    );

    // Move right
    if (nextWorldPosition.x > worldPosition.x) {
      this.player.flipHorizontal = false;
      position.x += PLAYER_SPEED * getFrameTime();
      if (position.x > this._positionToMoveTo.x) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    // Move left
    if (nextWorldPosition.x < worldPosition.x) {
      this.player.flipHorizontal = true;
      position.x -= PLAYER_SPEED * getFrameTime();
      if (position.x < this._positionToMoveTo.x) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    // Move up
    if (nextWorldPosition.y > worldPosition.y) {
      position.y += PLAYER_SPEED * getFrameTime();
      if (position.y > this._positionToMoveTo.y) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    // Move down
    if (nextWorldPosition.y < worldPosition.y) {
      position.y -= PLAYER_SPEED * getFrameTime();
      if (position.y < this._positionToMoveTo.y) {
        this.player.position = this._positionToMoveTo;
        return new IdleState(this.player);
      }
    }

    return null;
  }
}
