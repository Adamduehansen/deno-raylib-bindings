import {
  loadTexture,
  unloadTexture,
} from "@adamduehansen/raylib-bindings/r-textures";
import { RaylibTexture } from "@adamduehansen/raylib-bindings/r-core";

interface Resource {
  load(): void;
  unload(): void;
}

class TextureResource implements Resource {
  private _texture?: RaylibTexture;

  get texture(): RaylibTexture {
    if (this._texture === undefined) {
      throw new Error("Can't get a texture that is not loaded!");
    }
    return this._texture;
  }

  constructor(readonly path: string) {}

  load(): void {
    this._texture = loadTexture(this.path);
  }
  unload(): void {
    if (this._texture === undefined) {
      throw new Error("Can't unload a texture that is not loaded!");
    }

    unloadTexture(this._texture);
  }
}

const Resources = {
  diceTexure: new TextureResource("./assets/Dice.png"),
  backgroundTexture: new TextureResource("./assets/GemBg.png"),
} as const;

export default Resources;
