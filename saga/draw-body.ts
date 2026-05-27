import { Green, isWindowReady } from "@adamduehansen/raylib-bindings/r-core";
import { drawRectangleLinesEx } from "@adamduehansen/raylib-bindings/r-shapes";
import { Body, type RectangleBody } from "@adamduehansen/saga";
import type { Entity } from "./entity.ts";

export function drawBody(entity: Entity) {
  if (entity.body === undefined) {
    return;
  }

  if (isRect(entity.body)) {
    // We check if window is ready to ensure benchmark can run.
    if (isWindowReady() === true) {
      drawRectangleLinesEx({
        rec: {
          x: entity.position.x - entity.sprite!.width / 2,
          y: entity.position.y - entity.sprite!.height / 2,
          width: entity.body.width,
          height: entity.body.height,
        },
        lineThick: 1,
        color: Green,
      });
    }
  }
}

function isRect(body: Body): body is RectangleBody {
  return body.kind === Body.Kind.rectangle;
}
