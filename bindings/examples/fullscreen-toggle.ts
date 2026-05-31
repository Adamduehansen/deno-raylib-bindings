import * as r from "@adamduehansen/raylib-bindings";

const screenWidth = 800;
const screenHeight = 450;

r.initWindow({
  width: screenWidth,
  height: screenHeight,
  title: "raylib [core] example - fullscreen toggle",
});
r.setTargetFPS(60);

while (r.windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  if (r.isKeyPressed(r.KeyEnter) && r.isKeyDown(r.KeyLeftAlt)) {
    const display = r.getCurrentMonitor();

    if (r.isWindowFullScreen()) {
      r.setWindowSize(screenWidth, screenHeight);
    } else {
      r.setWindowSize(r.getMonitorWidth(display), r.getMonitorHeight(display));
    }

    r.toggleFullScreen();
  }

  // Draw
  // --------------------------------------------------------------------------
  r.beginDrawing();

  r.clearBackground(r.RayWhite);

  r.drawText({
    posX: 190,
    posY: 200,
    fontSize: 20,
    color: r.LightGray,
    text: "Press ALT + Enter to toggle fullscreen",
  });

  r.endDrawing();
}

r.closeWindow();
