import { Entity } from "../entity.ts";
import { RectangleGraphic } from "../graphic.ts";
import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  Red,
  setTargetFPS,
  windowShouldClose,
} from "../../raylib-bindings.ts";
import { vec } from "../vector.ts";

initWindow({
  title: "Example: Use of graphics",
  height: 450,
  width: 800,
});

setTargetFPS(60);

class Rectangle extends Entity {
  constructor() {
    super({
      graphic: new RectangleGraphic(Red),
      pos: vec(100, 100),
      width: 100,
      height: 100,
    });
  }

  override update(): void {}
}

const rectangle = new Rectangle();

while (windowShouldClose() === false) {
  beginDrawing();
  clearBackground(RayWhite);
  rectangle.render();
  endDrawing();
}

closeWindow();
