import {
  beginDrawing,
  Black,
  clearBackground,
  closeWindow,
  drawRectangle,
  drawText,
  endDrawing,
  getScreenHeight,
  getScreenWidth,
  Green,
  initWindow,
  isKeyDown,
  KeyA,
  KeyD,
  KeyS,
  KeyW,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "../../raylib-bindings.ts";

abstract class Entity {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Frog extends Entity {
}

initWindow({
  title: "Frogger",
  height: 260,
  width: 230,
});

setTargetFPS(60);

const frog = new Frog();
frog.x = getScreenWidth() / 2 - 8;
frog.y = getScreenHeight() / 2 - 8;
const frogSpeed = 1;

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  if (isKeyDown(KeyA)) {
    frog.x -= frogSpeed;
  } else if (isKeyDown(KeyD)) {
    frog.x += frogSpeed;
  }

  if (isKeyDown(KeyW)) {
    frog.y -= frogSpeed;
  } else if (isKeyDown(KeyS)) {
    frog.y += frogSpeed;
  }

  // Draw
  // --------------------------------------------------------------------------

  beginDrawing();

  clearBackground(RayWhite);

  drawRectangle({
    width: 16,
    height: 16,
    posX: frog.x,
    posY: frog.y,
    color: Green,
  });

  drawText({
    text: "Frogger!",
    fontSize: 24,
    posX: 0,
    posY: 0,
    color: Black,
  });

  endDrawing();
}

closeWindow();
