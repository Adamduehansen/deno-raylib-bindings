import {
  RaylibColor,
  RaylibVector,
  White,
} from "@adamduehansen/raylib-bindings/r-core";
import { ImageResource } from "./resource.ts";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";

export abstract class Graphic {
  abstract draw(position: RaylibVector): void;
}

interface SpriteArgs {
  image: ImageResource;
  color?: RaylibColor;
}

export class Sprite extends Graphic {
  readonly image: ImageResource;

  color: RaylibColor;

  constructor(args: SpriteArgs) {
    super();

    this.image = args.image;
    this.color = args.color ?? White;
  }

  draw(position: RaylibVector): void {
    const { texture } = this.image;

    if (texture === undefined) {
      return;
    }

    drawTexturePro({
      texture: texture,
      source: {
        x: 0,
        y: 0,
        width: texture.width,
        height: texture.height,
      },
      dest: {
        x: position.x,
        y: position.y,
        width: texture.width,
        height: texture.height,
      },
      origin: {
        x: texture.width / 2,
        y: texture.height / 2,
      },
      rotation: 0,
      tint: this.color,
    });
  }
}
