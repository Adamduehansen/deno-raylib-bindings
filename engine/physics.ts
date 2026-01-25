import { Green, Red } from "@adamduehansen/raylib-bindings/r-core";
import {
  drawCircleLinesV,
  drawCircleV,
  drawLineV,
} from "@adamduehansen/raylib-bindings/r-shapes";
import type Vector2 from "./vector.ts";
import { vec } from "./vector.ts";

export abstract class Body {
  centroid = vec(0, 0);
  color = Green;

  constructor(public readonly vertices: Vector2[]) {}

  update(delta: Vector2): void {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = this.vertices[i].add(delta);
    }
    this.centroid = this.centroid.add(delta);
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
}

export class CircleBody extends Body {
  constructor(public pos: Vector2, public radius: number) {
    super([pos, vec(pos.x + radius, pos.y)]);
    this.centroid = this.pos;
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
