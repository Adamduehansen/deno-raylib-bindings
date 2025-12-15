import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import Paddle from "./paddle.ts";
import Ball from "./ball.ts";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 450;

initWindow({
  title: "Arkanoid",
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
});

setTargetFPS(60);

const player = new Paddle();
const ball = new Ball();

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  player.update();
  ball.update();

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(RayWhite);

  player.draw();
  ball.draw();

  endDrawing();
}

closeWindow();
