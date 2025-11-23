import {
  closeWindow,
  getCurrentMonitor,
  getMonitorHeight,
  getMonitorWidth,
  initWindow,
  isWindowFullScreen,
  setWindowSize,
  toggleFullScreen,
  windowShouldClose,
} from "@src/window.ts";
import { setTargetFPS } from "@src/timing.ts";
import { isKeyDown, isKeyPressed, KeyEnter, KeyLeftAlt } from "@src/input.ts";
import { beginDrawing, clearBackground, endDrawing } from "@src/drawing.ts";
import { LightGray, RayWhite } from "@src/color.ts";
import { drawText } from "@src/text.ts";

const screenWidth = 800;
const screenHeight = 450;

initWindow({
  width: screenWidth,
  height: screenHeight,
  title: "raylib [core] example - fullscreen toggle",
});
setTargetFPS(60);

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  if (isKeyPressed(KeyEnter) && isKeyDown(KeyLeftAlt)) {
    const display = getCurrentMonitor();

    if (isWindowFullScreen()) {
      setWindowSize(screenWidth, screenHeight);
    } else {
      setWindowSize(getMonitorWidth(display), getMonitorHeight(display));
    }

    toggleFullScreen();
  }

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(RayWhite);

  drawText({
    posX: 190,
    posY: 200,
    fontSize: 20,
    color: LightGray,
    text: "Press ALT + Enter to toggle fullscreen",
  });

  endDrawing();
}

closeWindow();
