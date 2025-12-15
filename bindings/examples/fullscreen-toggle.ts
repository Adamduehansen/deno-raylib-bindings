import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getCurrentMonitor,
  getMonitorHeight,
  getMonitorWidth,
  initWindow,
  isKeyDown,
  isKeyPressed,
  isWindowFullScreen,
  KeyEnter,
  KeyLeftAlt,
  LightGray,
  RayWhite,
  setTargetFPS,
  setWindowSize,
  toggleFullScreen,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";

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
