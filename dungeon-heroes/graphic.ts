import {
  RaylibColor,
  RaylibTexture,
  White,
} from "@adamduehansen/raylib-bindings/r-core";
import { ImageResource } from "./resource.ts";
import { RaylibRectangle } from "@adamduehansen/raylib-bindings/r-shapes";

export abstract class Graphic {}

interface SpriteArgs {
  image: ImageResource;
  source: {
    x?: number;
    y?: number;
    width: number;
    height: number;
  };
  size?: {
    width?: number;
    height?: number;
  };
  color?: RaylibColor;
}

export class Sprite extends Graphic {
  readonly texture: RaylibTexture;
  readonly source: RaylibRectangle;
  readonly size: {
    width: number;
    height: number;
  };
  readonly color: RaylibColor;

  flipHorizontal: boolean = false;
  flipVertically: boolean = false;

  constructor({ image, source, color, size }: SpriteArgs) {
    super();

    if (image.texture === undefined) {
      // TODO: Maybe create a ImageNotLoadedError to reuse?
      throw new Error("Cant use an image resource that is not loaded!");
    }

    this.texture = image.texture;
    this.source = {
      x: source.x ?? 0,
      y: source.y ?? 0,
      width: source.width,
      height: source.height,
    };
    this.size = {
      width: size?.width ?? source.width,
      height: size?.height ?? source.height,
    };
    this.color = color ?? White;
  }

  static fromImage(image: ImageResource): Sprite {
    const { texture } = image;
    if (texture === undefined) {
      throw new Error("Cant use an image resource that is not loaded!");
    }

    return new Sprite({
      image: image,
      source: {
        width: texture.width,
        height: texture.height,
      },
    });
  }
}

// TODO: Create a rectangle graphic
// TODO: Create a circle graphic.
