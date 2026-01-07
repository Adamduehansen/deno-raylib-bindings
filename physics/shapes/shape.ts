import { Black } from "@adamduehansen/raylib-bindings/r-core";
import DrawUtils from "../utils/draw-utils.ts";
import { Vector2 } from "../vector2.ts";

export default abstract class Shape {
  centroid: Vector2 = new Vector2(0, 0);

  constructor(public readonly vertices: Vector2[]) {
    if (new.target === Shape) {
      throw new TypeError(
        "Cannot construct abstract instances directly from class 'Shape'",
      );
    }
  }

  setCentroid(position: Vector2): void {
    this.centroid = position;
  }

  draw() {
    for (let i = 1; i < this.vertices.length; i++) {
      DrawUtils.drawLine(this.vertices[i - 1], this.vertices[i], Black);
    }

    DrawUtils.drawLine(
      this.vertices[this.vertices.length - 1],
      this.vertices[0],
      Black,
    );

    DrawUtils.drawPoint(this.centroid, 5, Black);
  }
}
