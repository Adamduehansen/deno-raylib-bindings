import { Black, getMousePosition } from "@adamduehansen/raylib-bindings/r-core";
import DrawUtils from "./utils/draw-utils.ts";
import { Vector2 } from "./vector2.ts";

export default class Simulation {
  constructor() {}

  update(deltaTime: number): void {}

  draw(): void {
    const mousePosition = getMousePosition();

    // DrawUtils.drawPoint(new Vector2(400, 400), 20, Black);
    // DrawUtils.strokePoint(new Vector2(600, 600), 20, Blue);
    // DrawUtils.drawLine(new Vector2(100, 100), new Vector2(500, 500), Red);
    // DrawUtils.drawText(new Vector2(600, 400), 30, Black, "Hello, World!");

    DrawUtils.drawArrow(
      new Vector2(200, 600),
      new Vector2(mousePosition.x, mousePosition.y),
      Black,
    );
  }
}
