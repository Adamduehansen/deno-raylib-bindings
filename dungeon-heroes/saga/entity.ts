import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { GraphicsComponent, TransformComponent } from "./component.ts";
import { TextureResource } from "./resource.ts";

interface EntityArgs {
  textureResource: TextureResource;
  position: RaylibVector;
}

export class Entity {
  static CURRENT_MAX_ID = 1;

  id = Entity.CURRENT_MAX_ID++;

  readonly graphics: GraphicsComponent;
  readonly transform: TransformComponent;

  constructor({ textureResource, position }: EntityArgs) {
    this.graphics = new GraphicsComponent({
      textureResource: textureResource,
    });

    this.transform = new TransformComponent(position);
  }
}
