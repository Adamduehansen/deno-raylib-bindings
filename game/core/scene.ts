import { EntityCollection } from "./entity-collection.ts";
import { Camera } from "./camera.ts";

export class Scene {
  readonly camera = new Camera();
  readonly entities = new EntityCollection();
}
