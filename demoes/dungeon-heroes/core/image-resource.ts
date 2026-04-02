import type { RaylibTexture } from "@adamduehansen/raylib-bindings/r-core";
import {
  loadTexture,
  unloadTexture,
} from "@adamduehansen/raylib-bindings/r-textures";
import type { Resource } from "./resource.ts";

export default class TextureResource implements Resource {
  texture?: RaylibTexture;

  constructor(readonly path: string) {}

  load(): void {
    this.texture = loadTexture(this.path);
  }

  unload(): void {
    if (this.texture === undefined) {
      console.error(
        "Cannot unload texture that is not loaded. Path:",
        this.path,
      );
      return;
    }

    unloadTexture(this.texture);
  }
}
