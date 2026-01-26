import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getFrameTime,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import Simulation from "./simulation.ts";
import { Vector2 } from "./vector2.ts";

initWindow({
  title: "Physic",
  width: 1200,
  height: 720,
});

setTargetFPS(60);

const simulation = new Simulation(new Vector2(1200, 720));

while (windowShouldClose() === false) {
  const deltaTime = getFrameTime();

  simulation.update(deltaTime);

  beginDrawing();

  clearBackground(RayWhite);

  simulation.draw();

  endDrawing();
}

closeWindow();
