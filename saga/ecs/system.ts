import type { ComponentManager } from "./component-manager.ts";
import type { EntityCollection } from "./entity-collection.ts";

export interface System {
  process(
    entityCollection: EntityCollection,
    componentManager: ComponentManager,
  ): void;
}
