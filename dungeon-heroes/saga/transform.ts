import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";

export class Transform {
  z: number = 0;

  position: RaylibVector;

  constructor(position: RaylibVector) {
    this.position = position;
  }
}
