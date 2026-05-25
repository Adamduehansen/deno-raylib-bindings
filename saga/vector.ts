import type { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";

export class Vector {
  /**
   * Gets a vector equivalent to `{x: 0, y: 0}`.
   */
  static get zero(): RaylibVector {
    return { x: 0, y: 0 };
  }
}
