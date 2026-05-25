import type { TextureResource } from "./resource/texture-resource.ts";
import { Sprite } from "./sprite.ts";

interface Options {
  grid: {
    rows: number;
    columns: number;
    spriteWidth: number;
    spriteHeight: number;
  };
  spacing: {
    margin: {
      x: number;
      y: number;
    };
  };
}

export class SpriteSheet {
  constructor(
    readonly image: TextureResource,
    readonly options: Options,
  ) {}

  getSprite(x: number, y: number) {
    const { grid, spacing } = this.options;

    return new Sprite(this.image.texture!, {
      x: x * grid.spriteWidth + spacing.margin.x * x,
      y: y * grid.spriteHeight + spacing.margin.y * y,
      width: grid.spriteWidth,
      height: grid.spriteHeight,
    });
  }
}
