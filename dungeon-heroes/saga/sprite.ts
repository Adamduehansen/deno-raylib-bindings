import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "./entity.ts";
import { Graphics } from "./graphic.ts";
import { TextureResource } from "./resource.ts";
import { Transform } from "./transform.ts";

interface Args {
  textureResource: TextureResource;
  position: RaylibVector;
}

/**
 * A sprite is an entity that has graphic and a transform properties to render
 * a texture at a specific position.
 */
export default abstract class Sprite extends Entity {
  readonly graphics: Graphics;
  readonly transform: Transform;

  constructor({ textureResource, position }: Args) {
    super();

    this.graphics = new Graphics({
      textureResource: textureResource,
    });
    this.transform = new Transform(position);
  }
}
