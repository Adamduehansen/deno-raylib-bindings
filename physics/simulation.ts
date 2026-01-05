import { getMousePosition } from "@adamduehansen/raylib-bindings/r-core";
import { Vector2 } from "./vector2.ts";
import Circle from "./shapes/circle.ts";
import Rectangle from "./shapes/rectangle.ts";
import Polygon from "./shapes/polygon.ts";

export default class Simulation {
  testCircle = new Circle(new Vector2(100, 100), 50);
  testRect = new Rectangle(new Vector2(400, 400), 500, 250);
  testPolygon = new Polygon([
    new Vector2(500, 500),
    new Vector2(600, 600),
    new Vector2(400, 600),
    new Vector2(600, 700),
  ]);

  constructor() {}

  update(deltaTime: number): void {}

  draw(): void {
    const mousePosition = getMousePosition();

    // DrawUtils.drawPoint(new Vector2(400, 400), 20, Black);
    // DrawUtils.strokePoint(new Vector2(600, 600), 20, Blue);
    // DrawUtils.drawLine(new Vector2(100, 100), new Vector2(500, 500), Red);
    // DrawUtils.drawText(new Vector2(600, 400), 30, Black, "Hello, World!");

    // DrawUtils.drawArrow(
    //   new Vector2(200, 600),
    //   new Vector2(mousePosition.x, mousePosition.y),
    //   Black,
    // );

    this.testCircle.draw();
    this.testRect.draw();
    this.testPolygon.draw();
  }
}
