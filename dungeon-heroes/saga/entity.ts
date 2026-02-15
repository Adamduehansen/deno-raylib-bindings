import { GraphicsComponent } from "./component.ts";
import { TextureResource } from "./resource.ts";

interface EntityArgs {
  textureResource: TextureResource;
}

export class Entity {
  static CURRENT_MAX_ID = 1;

  id = Entity.CURRENT_MAX_ID++;

  readonly graphics: GraphicsComponent;

  constructor({ textureResource }: EntityArgs) {
    this.graphics = new GraphicsComponent({
      textureResource: textureResource,
    });
  }

  /**
   * This method will be called once each frame.
   */
  update(): void {}
}
