import {
  RaylibColor,
  RaylibVector,
  White,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import { TextureResource } from "./resource.ts";

interface GraphicsComponentArgs {
  textureResource: TextureResource;
  color?: RaylibColor;
}

export class Graphics {
  readonly textureResource: TextureResource;

  color: RaylibColor;

  constructor({ textureResource, color }: GraphicsComponentArgs) {
    this.textureResource = textureResource;
    this.color = color ?? White;
  }

  draw(position: RaylibVector): void {
    const { texture } = this.textureResource;

    if (texture === undefined) {
      return;
    }

    drawTexturePro({
      texture: texture,
      dest: {
        x: position.x,
        y: position.y,
        width: texture.width,
        height: texture.height,
      },
      source: {
        x: 0,
        y: 0,
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
