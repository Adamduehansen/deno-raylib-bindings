import {
  RaylibColor,
  RaylibVector,
  White,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import { TextureResource } from "../resource.ts";
import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";

export interface Graphics {
  draw(position: RaylibVector): void;
}

interface TextureGraphicsArgs {
  textureResource: TextureResource;
  color?: RaylibColor;
}

/**
 * Graphics for rendering textures.
 */
export class TextureGraphics implements Graphics {
  readonly textureResource: TextureResource;

  color: RaylibColor;

  constructor({ textureResource, color }: TextureGraphicsArgs) {
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

interface RectangleGraphicsArgs {
  width: number;
  height: number;
  color: RaylibColor;
}

/**
 * Graphics for rendering rectangles.
 */
export class RectangleGraphics implements Graphics {
  public width: number;
  public height: number;
  public color: RaylibColor;

  constructor({ color, height, width }: RectangleGraphicsArgs) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(position: RaylibVector): void {
    drawRectangleRec({
      color: this.color,
      rectangle: {
        x: position.x,
        y: position.y,
        width: this.width,
        height: this.height,
      },
    });
  }
}
