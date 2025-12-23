import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";

export function vec(x: number, y: number): RaylibVector {
  return {
    x: x,
    y: y,
  };
}
