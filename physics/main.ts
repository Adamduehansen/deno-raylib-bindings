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

initWindow({
  title: "Physic",
  width: 1200,
  height: 720,
});

setTargetFPS(60);

const simulation = new Simulation();

while (windowShouldClose() === false) {
  const deltaTime = getFrameTime();

  simulation.update(deltaTime);

  beginDrawing();

  clearBackground(RayWhite);

  simulation.draw();

  endDrawing();
}

closeWindow();
