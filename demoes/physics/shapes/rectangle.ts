import { Vector2 } from "../vector2.ts";
import Polygon from "./polygon.ts";

export default class Rectangle extends Polygon {
  constructor(
    public position: Vector2,
    public width: number,
    public height: number,
  ) {
    super([
      // Upper left corner
      new Vector2(position.x - width / 2, position.y - height / 2),
      // Upper right corner
      new Vector2(position.x + width / 2, position.y - height / 2),
      // Lower right corner
      new Vector2(position.x + width / 2, position.y + height / 2),
      // Lower left corner
      new Vector2(position.x - width / 2, position.y + height / 2),
    ]);
  }
}
