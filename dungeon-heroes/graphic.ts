import { RaylibColor } from "@adamduehansen/raylib-bindings/r-core";
import { ImageResource } from "./resource.ts";
import { RaylibRectangle } from "@adamduehansen/raylib-bindings/r-shapes";

export interface Sprite {
  type: "sprite";
  image: ImageResource;
  source: RaylibRectangle;
  dest: RaylibRectangle;
  color: RaylibColor;
}

export type Graphic = Sprite;
