import {
  getFrameTime,
  LOG_DEBUG,
  RaylibVector,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { GameContext } from "../../game-context.ts";
import { Player } from "./player.ts";
import { InputController } from "./input-controller.ts";
import { GameScene } from "../../scenes/game-scene.ts";
import Tp from "../../entities/tp.ts";

export abstract class PlayerState {
  constructor(readonly player: Player) {}

  abstract handleInput(inputController: InputController): void;
  abstract update(room: GameScene): PlayerState | null;

  // deno-lint-ignore no-unused-vars
  enter(room: GameScene): void {}
}

abstract class MoveCommand {
  constructor(readonly player: Player) {}
  abstract execute(): RaylibVector;
}

class MoveRightCommand extends MoveCommand {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x + 16,
    };
  }
}

class MoveLeftCommand extends MoveCommand {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      x: this.player.position.x - 16,
    };
  }
}

class MoveUpCommand extends MoveCommand {
  execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y - 16,
    };
  }
}

class MoveDownCommand extends MoveCommand {
  override execute(): RaylibVector {
    return {
      ...this.player.position,
      y: this.player.position.y + 16,
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

  override update(room: GameScene): PlayerState | null {
    if (this._nextPosition === undefined) {
      return null;
    }

    if (!room.canMoveToPosition(this._nextPosition) && !GameContext.isNoclip) {
      return null;
    }

    traceLog(
      LOG_DEBUG,
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

    traceLog(LOG_DEBUG, "Unlocking new room", tp.id.toString());
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

  override handleInput(_inputController: InputController): void {}

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
