import { Sprite } from "./graphic.ts";
import { ImageResource } from "./resource.ts";

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

export default class SpriteSheet {
  constructor(readonly image: ImageResource, readonly options: Options) {
  }

  getSprite(x: number, y: number): Sprite {
    const { grid, spacing } = this.options;

    return new Sprite({
      image: this.image,
      source: {
        x: x * grid.spriteWidth + spacing.margin.x * x,
        y: y * grid.spriteHeight + spacing.margin.y * y,
        width: grid.spriteWidth,
        height: grid.spriteHeight,
      },
      size: {},
    });
  }
}
