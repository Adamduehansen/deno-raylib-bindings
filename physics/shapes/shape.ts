import { Black, RaylibColor } from "@adamduehansen/raylib-bindings/r-core";
import DrawUtils from "../utils/draw-utils.ts";
import { Vector2 } from "../vector2.ts";
import MathHelper from "../utils/math-helper.ts";

export default abstract class Shape {
  centroid: Vector2 = new Vector2(0, 0);
  color = Black;

  constructor(public readonly vertices: Vector2[]) {
    if (new.target === Shape) {
      throw new TypeError(
        "Cannot construct abstract instances directly from class 'Shape'",
      );
    }
  }

  setColor(color: RaylibColor): void {
    this.color = color;
  }

  setCentroid(position: Vector2): void {
    this.centroid = position;
  }

  getCentroid(): Vector2 {
    return this.centroid;
  }

  draw() {
    for (let i = 1; i < this.vertices.length; i++) {
      DrawUtils.drawLine(this.vertices[i - 1], this.vertices[i], this.color);
    }

    DrawUtils.drawLine(
      this.vertices[this.vertices.length - 1],
      this.vertices[0],
      this.color,
    );

    DrawUtils.drawPoint(this.centroid, 5, this.color);
  }

  move(delta: Vector2): void {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i].add(delta);
    }
    this.centroid.add(delta);
  }

  rotate(radiansDelta: number): void {
    for (let i = 0; i < this.vertices.length; i++) {
      const rotatedVertices = MathHelper.rotateAroundPoint(
        this.vertices[i],
        this.centroid,
        radiansDelta,
      );
      this.vertices[i] = rotatedVertices;
    }
  }
}
