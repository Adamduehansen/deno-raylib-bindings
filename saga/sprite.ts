import type { RaylibTexture } from "@adamduehansen/raylib-bindings/r-core";

interface Options {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// TODO: Maybe refactor constructor to use TextureResource instead to avoid the "!" in "Resources.SomeTexture.texture!"

export class Sprite {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;

  constructor(readonly texture: RaylibTexture, options?: Options) {
    this.x = options?.x ?? 0;
    this.y = options?.y ?? 0;
    this.width = options?.width ?? texture.width;
    this.height = options?.height ?? texture.height;
  }
}
