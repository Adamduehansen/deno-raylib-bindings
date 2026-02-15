import { Entity } from "./entity.ts";
import { Graphics } from "./graphic.ts";
import { Transform } from "./transform.ts";

interface Args {
  graphic: Graphics;
  transform: Transform;
}

/**
 * A sprite is an entity that has graphic and a transform properties to render
 * a texture at a specific position.
 */
export default abstract class Sprite extends Entity {
  readonly graphics: Graphics;
  readonly transform: Transform;

  constructor({ graphic, transform }: Args) {
    super();

    this.graphics = graphic;
    this.transform = transform;
  }
}
