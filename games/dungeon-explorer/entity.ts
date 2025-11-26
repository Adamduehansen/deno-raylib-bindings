import {
  isKeyDown,
  KeyA,
  KeyD,
  KeyS,
  KeyW,
  Texture,
  Vector,
  White,
} from "@src/r-core.ts";
import ResourceManager from "./resource-manager.ts";
import { drawTextureRec } from "@src/r-textures.ts";
import { vec } from "@src/math.ts";

interface EntityArgs {
  position: Vector;
  spriteIndex: Vector;
}

abstract class Entity {
  private _texture: Texture;
  private _spriteIndex: Vector;

  position: Vector;

  constructor(args: EntityArgs) {
    this._texture = ResourceManager.getInstance().get("spritesheet");
    this.position = args.position;
    this._spriteIndex = args.spriteIndex;
  }

  update(): void {
  }

  render(): void {
    const textureMargin = 1;

    drawTextureRec({
      texture: this._texture,
      rectangle: {
        x: 8 * this._spriteIndex.x + textureMargin * this._spriteIndex.x,
        y: this._spriteIndex.y,
        height: 8,
        width: 8,
      },
      color: White,
      vector: {
        x: this.position.x,
        y: this.position.y,
      },
    });
  }
}

interface Args {
  position: Vector;
}

const PLAYER_SPEED = 2;

export class Player extends Entity {
  constructor(args: Args) {
    super({
      position: args.position,
      spriteIndex: vec(4, 0),
    });
  }

  override update(): void {
    super.update();

    if (isKeyDown(KeyD)) {
      this.position.x += PLAYER_SPEED;
    } else if (isKeyDown(KeyA)) {
      this.position.x -= PLAYER_SPEED;
    }

    if (isKeyDown(KeyW)) {
      this.position.y -= PLAYER_SPEED;
    } else if (isKeyDown(KeyS)) {
      this.position.y += PLAYER_SPEED;
    }
  }
}

export class Beholder extends Entity {
  constructor(args: Args) {
    super({
      position: args.position,
      spriteIndex: vec(13, 0),
    });
  }
}
