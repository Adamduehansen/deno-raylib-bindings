import { Vector2 } from "../vector2.ts";
import Shape from "./shape.ts";

export default class Polygon extends Shape {
  constructor(vertices: Vector2[]) {
    super(vertices);
  }
}
