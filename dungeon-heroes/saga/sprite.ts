import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "./entity.ts";
import { Graphics } from "./graphic.ts";
import { Transform } from "./transform.ts";

interface Args {
  graphics: Graphics;
  position: RaylibVector;
}

/**
 * A sprite is an entity that has graphic and a transform properties to render
 * a texture at a specific position.
 */
export default abstract class Sprite extends Entity {
  readonly graphics: Graphics;
  readonly transform: Transform;

  constructor({ graphics, position }: Args) {
    super();

    this.graphics = graphics;
    this.transform = new Transform(position);
  }
}
