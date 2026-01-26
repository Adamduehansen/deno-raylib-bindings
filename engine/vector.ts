import {
  vector2Add,
  vector2Subtract,
} from "@adamduehansen/raylib-bindings/r-math";

export function vec(x: number, y: number): Vector2 {
  return new Vector2(x, y);
}

export default class Vector2 {
  constructor(public x: number, public y: number) {}

  /**
   * Adds a vector to the current vector.
   */
  add(v: Vector2): void {
    const result = vector2Add(vec(this.x, this.y), vec(v.x, v.y));
    this.x = result.x;
    this.y = result.y;
  }

  /**
   * Creates a new instance of {@linkcode Vector2} from the values of this instance.
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  sub(v: Vector2): void {
    const result = vector2Subtract(vec(this.x, this.y), vec(v.x, v.y));
    this.x = result.x;
    this.y = result.y;
  }

  length2(): number {
    return this.x * this.x + this.y * this.y;
  }

  length(): number {
    return Math.sqrt(this.length2());
  }

  static add(vecA: Vector2, vecB: Vector2): Vector2 {
    return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
  }

  static scale(vec: Vector2, scale: number): Vector2 {
    return new Vector2(vec.x * scale, vec.y * scale);
  }

  static sub(vecA: Vector2, vecB: Vector2): Vector2 {
    return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
  }

  static zero(): Vector2 {
    return new Vector2(0, 0);
  }
}
