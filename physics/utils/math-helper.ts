import { Vector2 } from "../vector2.ts";

export default class MathHelper {
  static calculateCentroid(vertices: Vector2[]): Vector2 {
    const area = this.calculateArea(vertices);
    const length = vertices.length;
    let cX = 0;
    let cy = 0;

    for (let i = 0; i < length; i++) {
      const iNext = this.index(i + 1, length);

      const firstTermOfCx = vertices[i].x + vertices[iNext].x;
      const secondTermOfCx = vertices[i].x * vertices[iNext].y -
        vertices[iNext].x * vertices[i].y;

      cX += firstTermOfCx * secondTermOfCx;

      const firstTermOfCy = vertices[i].y + vertices[iNext].y;
      const secondTermOfCy = vertices[i].x * vertices[iNext].y -
        vertices[iNext].x * vertices[i].y;
      cy += firstTermOfCy * secondTermOfCy;
    }

    cX /= 6 * area;
    cy /= 6 * area;

    return new Vector2(cX, cy);
  }

  static calculateArea(vertices: Vector2[]): number {
    let area = 0;
    const length = vertices.length;

    for (let i = 0; i < length; i++) {
      const iNext = this.index(i + 1, length);
      area += vertices[i].x * vertices[iNext].y -
        vertices[iNext].x * vertices[i].y;
    }

    return area / 2;
  }

  static index(idx: number, arraySize: number): number {
    return (idx + arraySize) % arraySize;
  }
}
