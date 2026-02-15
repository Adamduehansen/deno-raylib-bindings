import { TextureResource } from "./resource.ts";

interface GraphicsComponentArgs {
  textureResource: TextureResource;
}

export class Graphics {
  readonly textureResource: TextureResource;

  constructor({ textureResource }: GraphicsComponentArgs) {
    this.textureResource = textureResource;
  }
}
