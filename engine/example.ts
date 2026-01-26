import {
  checkCollisionCircles,
  drawCircleLinesV,
  drawCircleV,
  drawLineV,
} from "@adamduehansen/raylib-bindings/r-shapes";
import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getFrameTime,
  Green,
  initWindow,
  isKeyDown,
  KeyA,
  KeyD,
  KeyE,
  KeyQ,
  KeyS,
  KeyW,
  RayWhite,
  Red,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import Vector2 from "./vector.ts";

abstract class Shape {
  centroid = new Vector2(0, 0);
  vel = new Vector2(0, 0);
  color = Green;

  constructor(readonly vertices: Vector2[]) {}

  draw(): void {
    for (let i = 0; i < this.vertices.length - 1; i++) {
      drawLineV({
        color: this.color,
        startPos: this.vertices[i],
        endPos: this.vertices[i + 1],
      });
    }

    // drawLineV({
    //   color: this.color,
    //   startPos: this.vertices[this.vertices.length - 1],
    //   endPos: this.vertices[0],
    // });

    drawCircleV({
      center: this.centroid,
      color: Red,
      radius: 3,
    });
  }

  move(delta: Vector2): void {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i].add(delta);
    }
    this.centroid.add(delta);
  }
}

class Circle extends Shape {
  constructor(public pos: Vector2, readonly radius: number) {
    super([
      pos.clone(), // Center
      new Vector2(pos.x + radius, pos.y), // Radius line
    ]);
    this.centroid = pos;
  }

  override draw(): void {
    super.draw();

    drawCircleLinesV({
      center: this.pos,
      color: Green,
      radius: this.radius,
    });
  }

  rotate(radians: number): void {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = this._rotateAroundPoint(
        this.vertices[i],
        this.centroid,
        radians,
      );
    }
  }

  private _rotateAroundPoint(
    toRotateVertice: Vector2,
    point: Vector2,
    radians: number,
  ): Vector2 {
    const rotated = new Vector2(0, 0);
    const direction = Vector2.sub(toRotateVertice, point);

    rotated.x = direction.x * Math.cos(radians) -
      direction.y * Math.sin(radians);
    rotated.y = direction.x * Math.sin(radians) +
      direction.y * Math.cos(radians);

    rotated.add(point);
    return rotated;
  }
}

initWindow({
  title: "example",
  width: 800,
  height: 450,
});

setTargetFPS(60);

const shapes: Shape[] = [];
const circle1 = new Circle(new Vector2(100, 100), 50);
const circle2 = new Circle(new Vector2(225, 100), 50);

shapes.push(circle1);
shapes.push(circle2);

while (windowShouldClose() === false) {
  // Handle input
  // --------------------------------------------------------------------------
  if (isKeyDown(KeyD)) {
    circle1.move(new Vector2(5, 0));
  } else if (isKeyDown(KeyA)) {
    circle1.move(new Vector2(-5, 0));
  }

  if (isKeyDown(KeyS)) {
    circle1.move(new Vector2(0, 5));
  } else if (isKeyDown(KeyW)) {
    circle1.move(new Vector2(0, -5));
  }

  if (isKeyDown(KeyE)) {
    circle1.rotate(0.05);
  } else if (isKeyDown(KeyQ)) {
    circle1.rotate(-0.05);
  }

  // Update
  // --------------------------------------------------------------------------
  for (let i = 0; i < shapes.length; i++) {
    // shapes[i].update();
  }

  // Check collision
  // --------------------------------------------------------------------------
  for (let i = 0; i < shapes.length; i++) {
    for (let j = 0; j < shapes.length; j++) {
      if (i === j) {
        continue;
      }

      const objectA = shapes[i];
      const objectB = shapes[j];

      if (
        objectA instanceof Circle && objectB instanceof Circle &&
        checkCollisionCircles(
          objectA.centroid,
          objectA.radius,
          objectB.centroid,
          objectB.radius,
        )
      ) {
        const centroidA = objectA.centroid;
        const centroidB = objectB.centroid;

        const direction = Vector2.sub(centroidB, centroidA);
        const circleARadius = circle1.radius;
        const circleBRadius = circle2.radius;

        const sumRadius = circleARadius + circleBRadius;

        if (direction.length2() < sumRadius * sumRadius) {
          const directionLength = direction.length();
          const penetrationNormal = Vector2.scale(
            direction,
            1 / directionLength,
          );
          const penetrationDepth = directionLength - sumRadius;
          const penetrationPoint = Vector2.add(
            centroidA,
            Vector2.scale(penetrationNormal, circleARadius),
          );

          const depth = penetrationDepth * -1;
          const normal = penetrationNormal;

          const push = Vector2.scale(normal, depth * 0.5);
          console.log(push);
          objectB.move(push);
          objectA.move(Vector2.scale(push, -1));
        }
      }

      // const result = CollisionDetection.checkCollisions(objectA, objectB);
      // console.log(result);
      // if (result === null) {
      //   continue;
      // }

      // const push = scale(result?.normal, result?.depth * 0.5);
      // console.log(push);
      // objectB.move(push);
      // objectA.move(scale(push, -1));
    }
  }

  // Drawing
  // --------------------------------------------------------------------------
  beginDrawing();
  clearBackground(RayWhite);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
  }
  endDrawing();
}

closeWindow();
