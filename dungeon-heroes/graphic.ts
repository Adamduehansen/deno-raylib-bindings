import { RaylibColor } from "@adamduehansen/raylib-bindings/r-core";
import { ImageResource } from "./resource.ts";

export interface Sprite {
  type: "sprite";
  image: ImageResource;
  color: RaylibColor;
}

export type Graphic = Sprite;
