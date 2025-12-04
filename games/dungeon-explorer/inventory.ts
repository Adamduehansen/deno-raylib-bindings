import Entity from "./entity.ts";

export default class Inventory {
  items: Entity[] = [];

  add(item: Entity) {
    this.items.push(item);
  }
}
