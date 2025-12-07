import Entity from "../entity.ts";

export default abstract class Component {
  protected owner: Entity;

  constructor(owner: Entity) {
    this.owner = owner;
  }
}
