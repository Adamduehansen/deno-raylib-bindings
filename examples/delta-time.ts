import {
  beginDrawing,
  Blue,
  clearBackground,
  closeWindow,
  DarkGray,
  endDrawing,
  getFPS,
  getFrameTime,
  getMouseWheelMove,
  initWindow,
  isKeyPressed,
  KeyR,
  type RaylibVector,
  RayWhite,
  Red,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawCircleV } from "@adamduehansen/raylib-bindings/r-shapes";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";

const SCREEN_HEIGHT = 450;
const SCREEN_WIDTH = 800;

initWindow({
  title: "raylib [core] example - delta time",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});

let currentFps = 60;

// Store the position for the both of the circles
const deltaCircle: RaylibVector = {
  x: 0,
  y: SCREEN_HEIGHT / 3,
};

const frameCircle = {
  x: 0,
  y: SCREEN_HEIGHT * (2 / 3),
};

// The speed applied to both circles
const speed = 10;
const circleRadius = 32;

setTargetFPS(currentFps);

//--------------------------------------------------------------------------------------

// Main game loop
while (windowShouldClose() === false) {
  // Update
  //----------------------------------------------------------------------------------
  // Adjust the FPS target based on the mouse wheel
  const mouseWheel = getMouseWheelMove();
  if (mouseWheel !== 0) {
    currentFps += mouseWheel;
    if (currentFps === 0) {
      currentFps = 0;
    }
    setTargetFPS(currentFps);
  }

  // Multiply by 6.0 (an arbitrary value) in order to make the speed
  // visually closer to the other circle (at 60 fps), for comparison
  deltaCircle.x += getFrameTime() * 6 * speed;
  // This circle can move faster or slower visually depending on the FPS
  frameCircle.x += 0.1 * speed;

  // If either circle is off the screen, reset it back to the start
  if (deltaCircle.x > SCREEN_WIDTH) {
    deltaCircle.x = 0;
  }

  if (frameCircle.x > SCREEN_WIDTH) {
    frameCircle.x = 0;
  }

  // Reset both circles positions
  if (isKeyPressed(KeyR)) {
    deltaCircle.x = 0;
    frameCircle.x = 0;
  }

  //----------------------------------------------------------------------------------

  // Draw
  //----------------------------------------------------------------------------------

  beginDrawing();

  clearBackground(RayWhite);

  drawCircleV({
    center: deltaCircle,
    color: Red,
    radius: circleRadius,
  });

  drawCircleV({
    center: frameCircle,
    color: Blue,
    radius: circleRadius,
  });

  let fpsText: string;
  if (currentFps <= 0) {
    fpsText = `FPS: Unlimited (${getFPS()})`;
  } else {
    fpsText = `FPS: ${getFPS()} (target: ${currentFps})`;
  }

  drawText({
    text: fpsText,
    color: DarkGray,
    fontSize: 20,
    posX: 10,
    posY: 10,
  });

  drawText({
    text: `Frame time: ${getFrameTime().toFixed(2)} ms`,
    color: DarkGray,
    fontSize: 20,
    posX: 10,
    posY: 30,
  });

  drawText({
    text: "Use the scroll wheel to change the fps limit, r to reset",
    color: DarkGray,
    fontSize: 20,
    posX: 10,
    posY: 50,
  });

  drawText({
    text: "FUNC: x += GetFrameTime()*speed",
    color: Red,
    fontSize: 20,
    posX: 10,
    posY: 90,
  });

  drawText({
    text: "FUNC: x += speed",
    color: Blue,
    fontSize: 20,
    posX: 10,
    posY: 240,
  });

  endDrawing();
}

closeWindow();
