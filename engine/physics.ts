import { type Color, Green, Red } from "@adamduehansen/raylib-bindings/r-core";
import {
  drawCircleLinesV,
  drawCircleV,
  drawRectangleLinesEx,
  type RaylibRectangle,
} from "@adamduehansen/raylib-bindings/r-shapes";
import type { Entity } from "./entity.ts";

export abstract class Body {
  color: Color = Green;

  constructor(protected readonly entity: Entity) {}

  update(): void {}

  abstract draw(): void;
}

/**
 * A physics body for a circle shape.
 */
export class CircleBody extends Body {
  readonly radius: number;

  constructor(entity: Entity, radius: number) {
    super(entity);
    this.radius = radius;
  }

  override draw(): void {
    drawCircleLinesV({
      center: this.entity.pos,
      color: this.color,
      radius: this.radius,
    });
  }
}

/**
 * A physics body for a rectangle shape.
 */
export class RectangleBody extends Body {
  private readonly _width: number;
  private readonly _height: number;

  constructor(entity: Entity, width: number, height: number) {
    super(entity);
    this._height = height;
    this._width = width;
  }

  getBounds(): RaylibRectangle {
    return {
      x: this.entity.pos.x - this._width / 2,
      y: this.entity.pos.y - this._height / 2,
      width: this._width,
      height: this._height,
    };
  }

  override draw(): void {
    // Draw outline
    drawRectangleLinesEx({
      color: this.color,
      lineThick: 1,
      rec: {
        height: this._height,
        width: this._width,
        x: this.entity.pos.x - this._width / 2,
        y: this.entity.pos.y - this._height / 2,
      },
    });

    // Draw center
    drawCircleV({
      center: this.entity.pos,
      color: Red,
      radius: 2,
    });
  }
}
