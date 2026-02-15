import { TextureResource } from "./resource.ts";
import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";

export type ComponentCtor<TComponent extends Component> = new (
  ...args: any[]
) => TComponent;

export abstract class Component {
}

interface GraphicsComponentArgs {
  textureResource: TextureResource;
}

export class GraphicsComponent extends Component {
  readonly textureResource: TextureResource;

  constructor({ textureResource }: GraphicsComponentArgs) {
    super();

    this.textureResource = textureResource;
  }
}

export class TransformComponent extends Component {
  position: RaylibVector;

  constructor(position: RaylibVector) {
    super();

    this.position = position;
  }
}
