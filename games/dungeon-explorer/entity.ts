import { Texture, Vector, White } from "@src/r-core.ts";
import ResourceManager from "./resource-manager.ts";
import { drawTextureRec } from "@src/r-textures.ts";
import { vec } from "@src/math.ts";

interface EntityArgs {
  vector: Vector;
  spriteIndex: Vector;
}

abstract class Entity {
  private _texture: Texture;
  private _position: Vector;
  private _spriteIndex: Vector;

  constructor(args: EntityArgs) {
    this._texture = ResourceManager.getInstance().get("spritesheet");
    this._position = args.vector;
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
        x: this._position.x,
        y: this._position.y,
      },
    });
  }
}

interface Args {
  vector: Vector;
}

export class Player extends Entity {
  constructor(args: Args) {
    super({
      vector: args.vector,
      spriteIndex: vec(4, 0),
    });
  }
}

export class Beholder extends Entity {
  constructor(args: Args) {
    super({
      vector: args.vector,
      spriteIndex: vec(13, 0),
    });
  }
}
