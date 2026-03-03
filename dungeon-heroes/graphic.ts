import {
  RaylibColor,
  RaylibTexture,
  White,
} from "@adamduehansen/raylib-bindings/r-core";
import { ImageResource } from "./resource.ts";
import { RaylibRectangle } from "@adamduehansen/raylib-bindings/r-shapes";

export interface Sprite {
  type: "sprite";
  texture: RaylibTexture;
  source: RaylibRectangle;
  dest: RaylibRectangle;
  color: RaylibColor;
}

export type Graphic = Sprite;

interface CreateSpriteArgs {
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

export class GraphicFactory {
  createSprite({ image, source, color, size }: CreateSpriteArgs): Sprite {
    if (image.texture === undefined) {
      throw new Error("Cant use an image resource that is not loaded!");
    }

    return {
      type: "sprite",
      texture: image.texture,
      source: {
        x: source.x ?? 0,
        y: source.y ?? 0,
        width: source.width,
        height: source.height,
      },
      dest: {
        x: 0,
        y: 0,
        width: size?.width ?? source.width,
        height: size?.height ?? source.height,
      },
      color: color ?? White,
    };
  }
}
