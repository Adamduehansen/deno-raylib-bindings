import { Entity, EntityArgs } from "../core/entity.ts";

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
