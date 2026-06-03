import * as r from "@adamduehansen/raylib-bindings";

const screenWidth = 800;
const screenHeight = 450;

r.initWindow({
  title: "raylib [core] example - 2d camera mouse zoom",
  width: screenWidth,
  height: screenHeight,
});

const camera: r.RaylibCamera = {
  zoom: 1,
  rotation: 0,
  target: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
};

let zoomMode = 0;

r.setTargetFPS(60);

while (r.windowShouldClose() === false) {
  // Update
  // ------------------------------------------------------------------------
  if (r.isKeyPressed(r.KeyOne)) {
    zoomMode = 0;
  } else if (r.isKeyPressed(r.KeyTwo)) {
    zoomMode = 1;
  }

  // Translate based on mouse right click
  if (r.isMouseButtonDown(r.MouseButtonLeft)) {
    const mouseDelta = r.getMouseDelta();
    const delta = r.vector2Scale(mouseDelta, -1 / camera.zoom);
    camera.target = r.vector2Add(camera.target, delta);
  }

  if (zoomMode === 0) {
    // Zoom based on the mouse wheel.
    const wheelDelta = r.getMouseWheelMove();
    if (wheelDelta !== 0) {
      // Get the world point under the mouse
      const mouseWorldPos = r.getScreenToWorld2D(r.getMousePosition(), camera);

      // Set the offset to where the mouse is.
      camera.offset = r.getMousePosition();

      // Set the target to match, so that the camera maps the world space point
      // under the cursor to the screen space point under the cursor at any zoom
      camera.target = mouseWorldPos;

      // Zoom increment
      // Uses log scaling to provide consistent zoom speed
      const scale = 0.2 * wheelDelta;
      camera.zoom = r.clamp(Math.exp(Math.log(camera.zoom) + scale), 0.125, 64);
    }
  }

  // Drawing
  // ------------------------------------------------------------------------
  r.beginDrawing();

  r.clearBackground(r.RayWhite);

  r.beginMode2D(camera);
  r.rlPushMatrix();
  r.rlTranslatef(0, 25 * 50, 0);
  r.rlRotatef(90, 1, 0, 0);
  r.drawGrid(100, 50);
  r.rlPopMatrix();

  r.drawCircle({
    centerX: r.getScreenWidth() / 2,
    centerY: r.getScreenHeight() / 2,
    radius: 50,
    color: r.DarkGreen,
  });
  r.endMode2D();

  // Draw mouse reference
  r.drawCircleV({
    center: r.getMousePosition(),
    radius: 4,
    color: r.DarkGray,
  });

  r.drawTextEx({
    font: r.getFontDefault(),
    text: `[${r.getMouseX()}, ${r.getMouseY()}]`,
    tint: r.Black,
    spacing: 2,
    fontSize: 20,
    position: r.vector2Add(r.getMousePosition(), {
      x: -44,
      y: -24,
    }),
  });

  r.endDrawing();
}

r.closeWindow();
