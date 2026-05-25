import { Entity, EntityArgs } from "@adamduehansen/saga";

interface Args extends EntityArgs {
  solid: boolean;
}

export class Tile extends Entity {
  readonly solid: boolean;

  constructor({ solid, ...rest }: Args) {
    super({
      ...rest,
    });
    this.solid = solid;
  }
}
