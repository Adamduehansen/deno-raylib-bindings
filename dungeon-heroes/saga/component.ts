import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import { TextureResource } from "./resource.ts";
import { White } from "@adamduehansen/raylib-bindings/r-core";

export interface Component {
}

interface GraphicsComponentArgs {
  textureResource: TextureResource;
}

export class GraphicsComponent implements Component {
  readonly textureResource: TextureResource;

  constructor({ textureResource }: GraphicsComponentArgs) {
    this.textureResource = textureResource;
  }

  draw(): void {
    const { texture } = this.textureResource;
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
        x: 100,
        y: 100,
        width: texture.width,
        height: texture.height,
      },
      origin: {
        x: texture.width / 2,
        y: texture.height / 2,
      },
      rotation: 0,
      tint: White,
    });
  }
}
