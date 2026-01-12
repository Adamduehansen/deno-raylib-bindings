import {
  getMousePosition,
  isKeyDown,
  KeyA,
  KeyComma,
  KeyD,
  KeyDown,
  KeyE,
  KeyLeft,
  KeyPeriod,
  KeyQ,
  KeyRight,
  KeyS,
  KeyUp,
  KeyW,
} from "@adamduehansen/raylib-bindings/r-core";
import { Vector2 } from "./vector2.ts";
import Circle from "./shapes/circle.ts";
import Rectangle from "./shapes/rectangle.ts";
import Polygon from "./shapes/polygon.ts";

export default class Simulation {
  testCircle = new Circle(new Vector2(100, 100), 50);
  testRect = new Rectangle(new Vector2(400, 400), 500, 250);
  testPolygon = new Polygon([
    new Vector2(500, 500),
    new Vector2(800, 600),
    new Vector2(600, 700),
    new Vector2(400, 600),
  ]);

  constructor() {}

  update(deltaTime: number): void {
    const moveSpeed = 5;
    const rotateRadians = 0.05;
    if (isKeyDown(KeyD)) {
      this.testRect.move(new Vector2(moveSpeed, 0));
    } else if (isKeyDown(KeyA)) {
      this.testRect.move(new Vector2(-moveSpeed, 0));
    } else if (isKeyDown(KeyS)) {
      this.testRect.move(new Vector2(0, moveSpeed));
    } else if (isKeyDown(KeyW)) {
      this.testRect.move(new Vector2(0, -moveSpeed));
    }

    if (isKeyDown(KeyE)) {
      this.testRect.rotate(rotateRadians);
    } else if (isKeyDown(KeyQ)) {
      this.testRect.rotate(-rotateRadians);
    }

    if (isKeyDown(KeyRight)) {
      this.testCircle.move(new Vector2(moveSpeed, 0));
    } else if (isKeyDown(KeyLeft)) {
      this.testCircle.move(new Vector2(-moveSpeed, 0));
    } else if (isKeyDown(KeyDown)) {
      this.testCircle.move(new Vector2(0, moveSpeed));
    } else if (isKeyDown(KeyUp)) {
      this.testCircle.move(new Vector2(0, -moveSpeed));
    }

    if (isKeyDown(KeyPeriod)) {
      this.testCircle.rotate(rotateRadians);
    } else if (isKeyDown(KeyComma)) {
      this.testCircle.rotate(-rotateRadians);
    }
  }

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
