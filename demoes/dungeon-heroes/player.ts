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

const PLAYER_SPEED = 2;

export class Player extends Entity {
  private _isMoving = false;
  private _inputController = new InputController();
  private _rightActionPressedCommand = new MoveRightCommand(this);
  private _leftActionPressedCommand = new MoveLeftCommand(this);
  private _upActionPressedCommand = new MoveUpCommand(this);
  private _downActionPressedCommand = new MoveDownCommand(this);

  private _level: DemoLevel;

  private _positionToMoveTo?: RaylibVector;

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
      const nextPosition = this._rightActionPressedCommand.execute();

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this._positionToMoveTo = nextPosition;
    }

    if (this._inputController.isLeftPressed()) {
      const nextPosition = this._leftActionPressedCommand.execute();

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this._positionToMoveTo = nextPosition;
    }

    if (this._inputController.isUpPressed()) {
      const nextPosition = this._upActionPressedCommand.execute();

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this._positionToMoveTo = nextPosition;
    }

    if (this._inputController.isDownPressed()) {
      const nextPosition = this._downActionPressedCommand.execute();

      if (!this._canMoveToPosition(nextPosition)) {
        return;
      }

      this._isMoving = true;
      this._positionToMoveTo = nextPosition;
    }
  }

  private _movePosition(): void {
    if (this._positionToMoveTo === undefined) {
      return;
    }

    if (this._positionToMoveTo.x !== this.position.x) {
      this.position.x += this._positionToMoveTo.x > this.position.x
        ? PLAYER_SPEED
        : -PLAYER_SPEED;
    }
    if (this._positionToMoveTo.y !== this.position.y) {
      this.position.y += this._positionToMoveTo.y > this.position.y
        ? PLAYER_SPEED
        : -PLAYER_SPEED;
    }

    if (
      this._positionToMoveTo.x === this.position.x &&
      this._positionToMoveTo.y === this.position.y
    ) {
      this._positionToMoveTo = undefined;
      this._isMoving = false;
    }
  }
}
