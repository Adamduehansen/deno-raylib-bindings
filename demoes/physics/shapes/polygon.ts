import { Green } from "@adamduehansen/raylib-bindings/r-core";
import DrawUtils from "../utils/draw-utils.ts";
import MathHelper from "../utils/math-helper.ts";
import { add, scale, sub, Vector2 } from "../vector2.ts";
import Shape from "./shape.ts";

export default class Polygon extends Shape {
  normals: Vector2[];

  constructor(vertices: Vector2[]) {
    super(vertices);
    const centroid = MathHelper.calculateCentroid(vertices);
    this.setCentroid(centroid);
    this.normals = MathHelper.calculateNormals(vertices);
  }

  override rotate(radiansDelta: number): void {
    super.rotate(radiansDelta);
    this.normals = MathHelper.calculateNormals(this.vertices);
  }

  override draw(): void {
    super.draw();

    for (let i = 0; i < this.normals.length; i++) {
      const direction = sub(
        this.vertices[MathHelper.index(i + 1, this.vertices.length)],
        this.vertices[i],
      );
      const center = add(this.vertices[i], scale(direction, 0.5));
      const end = add(center, scale(this.normals[i], 15));
      DrawUtils.drawLine(center, end, Green);
    }
  }
}
