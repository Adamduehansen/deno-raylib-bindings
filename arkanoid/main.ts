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
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import { GameScene } from "./scene.ts";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 450;

initWindow({
  title: "Arkanoid",
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
});

setTargetFPS(60);

let currentScene = new GameScene();

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  currentScene.update();

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(RayWhite);

  currentScene.draw();

  drawFPS(0, 0);

  endDrawing();
}

closeWindow();
