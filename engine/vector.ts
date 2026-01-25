import { vector2Add } from "@adamduehansen/raylib-bindings/r-math";

export function vec(x: number, y: number): Vector2 {
  return new Vector2(x, y);
}

export default class Vector2 {
  constructor(public x: number, public y: number) {}

  /**
   * Adds a vector to the current vector.
   * @param vec
   */
  add(v: Vector2): Vector2 {
    const result = vector2Add(vec(this.x, this.y), vec(v.x, v.y));
    return new Vector2(result.x, result.y);
  }
}
