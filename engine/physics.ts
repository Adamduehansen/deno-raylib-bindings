import { Green, Red } from "@adamduehansen/raylib-bindings/r-core";
import {
  drawCircleLinesV,
  drawCircleV,
  drawLineV,
} from "@adamduehansen/raylib-bindings/r-shapes";
import Vector2, { vec } from "./vector.ts";

export abstract class Body {
  centroid = vec(0, 0);
  color = Green;

  constructor(public readonly vertices: Vector2[]) {}

  update(delta: Vector2): void {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i].add(delta);
    }
    this.centroid.add(delta);
  }

  draw(): void {
    for (let i = 1; i < this.vertices.length; i++) {
      drawLineV({
        color: this.color,
        startPos: this.vertices[i - 1],
        endPos: this.vertices[i],
      });
    }

    drawLineV({
      color: this.color,
      startPos: this.vertices[this.vertices.length - 1],
      endPos: this.vertices[0],
    });

    drawCircleV({
      center: this.centroid,
      color: Red,
      radius: 3,
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
    const direction = toRotateVertice.copy();
    direction.sub(point);

    rotated.x = direction.x * Math.cos(radians) -
      direction.y * Math.sin(radians);
    rotated.y = direction.x * Math.sin(radians) +
      direction.y * Math.cos(radians);

    rotated.add(point);
    return rotated;
  }
}

export class CircleBody extends Body {
  constructor(public pos: Vector2, public radius: number) {
    super([pos.copy(), vec(pos.x + radius, pos.y)]);
    this.centroid = this.pos.copy();
  }

  override draw(): void {
    super.draw();
    drawCircleLinesV({
      center: this.centroid,
      color: Green,
      radius: this.radius,
    });
  }
}
