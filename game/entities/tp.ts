import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "../core/entity.ts";

interface Args {
  position: RaylibVector;
  destination: string;
}

export default class Tp extends Entity {
  readonly destination: string;

  private _discovered = false;

  get discovered(): boolean {
    return this._discovered;
  }

  constructor({ position, destination }: Args) {
    super({
      name: "Tp",
      position: position,
    });
    this.destination = destination;
  }

  discover(): void {
    this._discovered = true;
  }
}
