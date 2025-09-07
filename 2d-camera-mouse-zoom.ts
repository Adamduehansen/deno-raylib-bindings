import {
  beginDrawing,
  beginMode2D,
  Camera,
  clearBackground,
  closeWindow,
  DarkGreen,
  drawCircle,
  endDrawing,
  endMode2D,
  getMouseDelta,
  getMousePosition,
  getMouseWheelMove,
  getScreenHeight,
  getScreenToWorld2D,
  getScreenWidth,
  initWindow,
  isKeyPressed,
  isMouseButtonDown,
  KeyOne,
  KeyTwo,
  MouseButtonLeft,
  RayWhite,
  setTargetFPS,
  vector2Add,
  vector2Scale,
  windowShouldClose,
} from "./raylib-bindings.ts";

if (import.meta.main) {
  const screenWidth = 800;
  const screenHeight = 450;

  initWindow({
    title: "raylib [core] example - 2d camera mouse zoom",
    width: screenWidth,
    height: screenHeight,
  });

  const camera: Camera = {
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

  setTargetFPS(60);

  while (windowShouldClose() === false) {
    // Update
    // ------------------------------------------------------------------------
    if (isKeyPressed(KeyOne)) {
      zoomMode = 0;
    } else if (isKeyPressed(KeyTwo)) {
      zoomMode = 1;
    }

    // Translate based on mouse right click
    if (isMouseButtonDown(MouseButtonLeft)) {
      const mouseDelta = getMouseDelta();
      const delta = vector2Scale(mouseDelta, -1 / camera.zoom);
      camera.target = vector2Add(camera.target, delta);
    }

    if (zoomMode === 0) {
      // Zoom based on the mouse wheel.
      const wheelDelta = getMouseWheelMove();
      if (wheelDelta !== 0) {
        // Get the world point under the mouse
        const mouseWorldPos = getScreenToWorld2D(getMousePosition(), camera);

        // Set the offset to where the mouse is.
        camera.offset = getMousePosition();

        // Set the target to match, so that the camera maps the world space point
        // under the cursor to the screen space point under the cursor at any zoom
        camera.target = mouseWorldPos;
      }
    }

    // Drawing
    // ------------------------------------------------------------------------
    beginDrawing();

    clearBackground(RayWhite);

    beginMode2D(camera);
    drawCircle({
      centerX: getScreenWidth() / 2,
      centerY: getScreenHeight() / 2,
      radius: 50,
      color: DarkGreen,
    });
    endMode2D();

    endDrawing();
  }

  closeWindow();
}
