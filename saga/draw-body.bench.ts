import { RectangleBody } from "./body.ts";
import { drawBody } from "./draw-body.ts";
import { Entity } from "./entity.ts";

Deno.bench("draw-body", () => {
  const entity = new Entity({
    position: {
      x: 0,
      y: 0,
    },
  });
  entity.body = new RectangleBody(10, 10);

  drawBody(entity);
});
