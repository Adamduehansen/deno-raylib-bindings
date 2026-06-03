import * as r from "@adamduehansen/raylib-bindings";

const SCREEN_HEIGHT = 450;
const SCREEN_WIDTH = 800;

r.initWindow({
  title: "raylib [core] example - delta time",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});

let currentFps = 60;

// Store the position for the both of the circles
const deltaCircle: r.RaylibVector = {
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

r.setTargetFPS(currentFps);

//--------------------------------------------------------------------------------------

// Main game loop
while (r.windowShouldClose() === false) {
  // Update
  //----------------------------------------------------------------------------------
  // Adjust the FPS target based on the mouse wheel
  const mouseWheel = r.getMouseWheelMove();
  if (mouseWheel !== 0) {
    currentFps += mouseWheel;
    if (currentFps === 0) {
      currentFps = 0;
    }
    r.setTargetFPS(currentFps);
  }

  // Multiply by 6.0 (an arbitrary value) in order to make the speed
  // visually closer to the other circle (at 60 fps), for comparison
  deltaCircle.x += r.getFrameTime() * 6 * speed;
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
  if (r.isKeyPressed(r.KeyR)) {
    deltaCircle.x = 0;
    frameCircle.x = 0;
  }

  //----------------------------------------------------------------------------------

  // Draw
  //----------------------------------------------------------------------------------

  r.beginDrawing();

  r.clearBackground(r.RayWhite);

  r.drawCircleV({
    center: deltaCircle,
    color: r.Red,
    radius: circleRadius,
  });

  r.drawCircleV({
    center: frameCircle,
    color: r.Blue,
    radius: circleRadius,
  });

  let fpsText: string;
  if (currentFps <= 0) {
    fpsText = `FPS: Unlimited (${r.getFPS()})`;
  } else {
    fpsText = `FPS: ${r.getFPS()} (target: ${currentFps})`;
  }

  r.drawText({
    text: fpsText,
    color: r.DarkGray,
    fontSize: 20,
    posX: 10,
    posY: 10,
  });

  r.drawText({
    text: `Frame time: ${r.getFrameTime().toFixed(2)} ms`,
    color: r.DarkGray,
    fontSize: 20,
    posX: 10,
    posY: 30,
  });

  r.drawText({
    text: "Use the scroll wheel to change the fps limit, r to reset",
    color: r.DarkGray,
    fontSize: 20,
    posX: 10,
    posY: 50,
  });

  r.drawText({
    text: "FUNC: x += GetFrameTime()*speed",
    color: r.Red,
    fontSize: 20,
    posX: 10,
    posY: 90,
  });

  r.drawText({
    text: "FUNC: x += speed",
    color: r.Blue,
    fontSize: 20,
    posX: 10,
    posY: 240,
  });

  r.endDrawing();
}

r.closeWindow();
