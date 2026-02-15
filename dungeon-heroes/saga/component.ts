import { TextureResource } from "./resource.ts";
import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";

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
}

export class TransformComponent implements Component {
  position: RaylibVector;

  constructor(position: RaylibVector) {
    this.position = position;
  }
}
