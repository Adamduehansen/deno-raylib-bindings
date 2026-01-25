import {
  Black,
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
  Red,
} from "@adamduehansen/raylib-bindings/r-core";
import { scale, Vector2 } from "./vector2.ts";
import Circle from "./shapes/circle.ts";
import Rectangle from "./shapes/rectangle.ts";
import Polygon from "./shapes/polygon.ts";
import { CollisionDetection } from "./collision-detection.ts";
import CollisionManifold from "./collision-manifold.ts";
import Shape from "./shapes/shape.ts";

export default class Simulation {
  collistionManifold: CollisionManifold | null = null;
  shapes: Shape[] = [];

  // testCircleA = new Circle(new Vector2(100, 100), 100);
  // testCircleB = new Circle(new Vector2(300, 300), 50);

  constructor() {
    this.shapes.push(new Circle(new Vector2(600, 300), 100));
    this.shapes.push(
      new Polygon([
        new Vector2(0, 0),
        new Vector2(100, 0),
        new Vector2(50, 100),
      ]),
    );
    this.shapes.push(new Rectangle(new Vector2(600, 400), 150, 150));
  }

  update(deltaTime: number): void {
    const moveSpeed = 5;
    const rotateRadians = 0.05;
    if (isKeyDown(KeyD)) {
      this.shapes[0].move(new Vector2(moveSpeed, 0));
    } else if (isKeyDown(KeyA)) {
      this.shapes[0].move(new Vector2(-moveSpeed, 0));
    }
    if (isKeyDown(KeyS)) {
      this.shapes[0].move(new Vector2(0, moveSpeed));
    } else if (isKeyDown(KeyW)) {
      this.shapes[0].move(new Vector2(0, -moveSpeed));
    }
    if (isKeyDown(KeyE)) {
      this.shapes[0].rotate(rotateRadians);
    } else if (isKeyDown(KeyQ)) {
      this.shapes[0].rotate(-rotateRadians);
    }

    if (isKeyDown(KeyRight)) {
      this.shapes[1].move(new Vector2(moveSpeed, 0));
    } else if (isKeyDown(KeyLeft)) {
      this.shapes[1].move(new Vector2(-moveSpeed, 0));
    }
    if (isKeyDown(KeyDown)) {
      this.shapes[1].move(new Vector2(0, moveSpeed));
    } else if (isKeyDown(KeyUp)) {
      this.shapes[1].move(new Vector2(0, -moveSpeed));
    }

    if (isKeyDown(KeyPeriod)) {
      this.shapes[1].rotate(rotateRadians);
    } else if (isKeyDown(KeyComma)) {
      this.shapes[1].rotate(-rotateRadians);
    }

    // Check collision

    for (let i = 0; i < this.shapes.length; i++) {
      for (let j = 0; j < this.shapes.length; j++) {
        if (i === j) {
          continue;
        }

        const objectA = this.shapes[i];
        const objectB = this.shapes[j];

        const result = CollisionDetection.checkCollisions(objectA, objectB);
        console.log(result);
        if (result === null) {
          continue;
        }

        const push = scale(result?.normal, result?.depth * 0.5);
        objectB.move(push);
        objectA.move(scale(push, -1));
      }
    }

    // const result = CollisionDetection.circleVsCircle(
    //   this.testCircleA,
    //   this.testCircleB,
    // );

    // this.collistionManifold = null;
    // if (result) {
    //   this.testCircleA.setColor(Red);
    //   this.testCircleB.setColor(Red);
    //   this.collistionManifold = result;

    //   const push = scale(result.normal, result.depth);
    //   this.testCircleB.move(push);
    // } else {
    //   this.testCircleA.setColor(Black);
    //   this.testCircleB.setColor(Black);
    // }
  }

  draw(): void {
    const mousePosition = getMousePosition();

    // this.testRectA.draw();
    // this.testRectB.draw();
    for (let i = 0; i < this.shapes.length; i++) {
      const element = this.shapes[i];
      element.draw();
    }

    if (this.collistionManifold !== null) {
      this.collistionManifold.draw();
    }

    // DrawUtils.drawPoint(new Vector2(400, 400), 20, Black);
    // DrawUtils.strokePoint(new Vector2(600, 600), 20, Blue);
    // DrawUtils.drawLine(new Vector2(100, 100), new Vector2(500, 500), Red);
    // DrawUtils.drawText(new Vector2(600, 400), 30, Black, "Hello, World!");

    // DrawUtils.drawArrow(
    //   new Vector2(200, 600),
    //   new Vector2(mousePosition.x, mousePosition.y),
    //   Black,
    // );

    // this.testRect.draw();
    // this.testPolygon.draw();
  }
}
