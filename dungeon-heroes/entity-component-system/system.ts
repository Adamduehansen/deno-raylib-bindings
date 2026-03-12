import ComponentManager from "./component-manager.ts";
import { EntityCollection } from "./entity-collection.ts";

export default interface System {
  process(
    entityCollection: EntityCollection,
    componentManager: ComponentManager,
  ): void;
}
