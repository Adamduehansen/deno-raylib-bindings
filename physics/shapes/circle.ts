import DrawUtils from "../utils/draw-utils.ts";
import { Vector2 } from "../vector2.ts";
import Shape from "./shape.ts";

export default class Circle extends Shape {
  constructor(public position: Vector2, public radius: number) {
    super([
      new Vector2(position.x, position.y),
      new Vector2(position.x + radius, position.y),
    ]);
    this.position = position;
    this.radius = radius;
    this.setCentroid(this.position);
  }

  getRadius(): number {
    return this.radius;
  }

  override draw(): void {
    super.draw();
    DrawUtils.strokePoint(this.position, this.radius, this.color);
  }
}
