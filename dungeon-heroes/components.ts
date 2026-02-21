import { RaylibVector, White } from "@adamduehansen/raylib-bindings/r-core";
import { TextureResource } from "./resource.ts";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";

export interface Component {}

export type ComponentCtor<TComponent extends Component = Component> = new (
  ...args: any[]
) => TComponent;

export class TextureComponent implements Component {
  constructor(readonly textureResource: TextureResource) {}

  draw(position: RaylibVector): void {
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
        x: position.x,
        y: position.y,
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

export class TransformComponent implements Component {
  constructor(public position: RaylibVector) {}
}
