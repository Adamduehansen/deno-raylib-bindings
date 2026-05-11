import { RaylibColor } from "@adamduehansen/raylib-bindings/r-core";
import {
  drawTextEx,
  getFontDefault,
} from "@adamduehansen/raylib-bindings/r-text";
import {
  drawCircleLinesV,
  drawCircleV,
  drawLineV,
} from "@adamduehansen/raylib-bindings/r-shapes";
import { add, scale, sub, Vector2 } from "../vector2.ts";

export default class DrawUtils {
  static drawPoint(position: Vector2, radius: number, color: RaylibColor) {
    drawCircleV({
      color: color,
      center: {
        x: position.x,
        y: position.y,
      },
      radius: radius,
    });
  }

  static strokePoint(position: Vector2, radius: number, color: RaylibColor) {
    drawCircleLinesV({
      color: color,
      center: {
        x: position.x,
        y: position.y,
      },
      radius: radius,
    });
  }

  static drawLine(
    startPosition: Vector2,
    endPosition: Vector2,
    color: RaylibColor,
  ) {
    drawLineV({
      color: color,
      startPos: {
        x: startPosition.x,
        y: startPosition.y,
      },
      endPos: {
        x: endPosition.x,
        y: endPosition.y,
      },
    });
  }

  static drawText(
    position: Vector2,
    size: number,
    color: RaylibColor,
    text: string,
  ) {
    drawTextEx({
      font: getFontDefault(),
      fontSize: size,
      position: position,
      spacing: 1,
      text: text,
      tint: color,
    });
  }

  static drawArrow(
    startPosition: Vector2,
    arrowHeadPosition: Vector2,
    color: RaylibColor,
  ): void {
    this.drawLine(startPosition, arrowHeadPosition, color);

    const direction = sub(arrowHeadPosition, startPosition);
    direction.normalize();
    const arrowHeadCenter = sub(arrowHeadPosition, scale(direction, 10));

    const directionToLeftArrowHead = direction.getNormal();
    const leftArrowHeadPosition = add(
      arrowHeadCenter,
      scale(directionToLeftArrowHead, 5),
    );
    this.drawLine(leftArrowHeadPosition, arrowHeadPosition, color);

    const directionToRightArrowHead = direction.getNormal();
    const rightArrowHeadPosition = sub(
      arrowHeadCenter,
      scale(directionToRightArrowHead, 5),
    );
    this.drawLine(rightArrowHeadPosition, arrowHeadPosition, color);
  }
}
