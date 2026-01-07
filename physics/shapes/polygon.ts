import MathHelper from "../utils/math-helper.ts";
import { Vector2 } from "../vector2.ts";
import Shape from "./shape.ts";

export default class Polygon extends Shape {
  constructor(vertices: Vector2[]) {
    super(vertices);
    const centroid = MathHelper.calculateCentroid(vertices);
    this.setCentroid(centroid);
  }
}
