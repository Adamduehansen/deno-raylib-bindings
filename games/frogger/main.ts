import {
  beginDrawing,
  clearBackground,
  closeWindow,
  Color,
  drawRectangleRec,
  endDrawing,
  getFrameTime,
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
  Red,
  setTargetFPS,
  windowShouldClose,
} from "../../raylib-bindings.ts";

abstract class Entity {
  x: number;
  y: number;
  color: Color;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.color = RayWhite;
  }

  render() {
    drawRectangleRec({
      x: this.x,
      y: this.y,
      width: 16,
      height: 16,
    }, this.color);
  }
}

class Frog extends Entity {
  constructor() {
    super();
    this.color = Green;
  }
}

class Car extends Entity {
  constructor() {
    super();
    this.color = Red;
  }
}

initWindow({
  title: "Frogger",
  height: 240,
  width: 160,
});

setTargetFPS(60);

const frog = new Frog();
frog.x = getScreenWidth() / 2 - 8;
frog.y = getScreenHeight() / 2 - 8;
const frogSpeed = 200;

const car = new Car();
car.x = getScreenWidth();
car.y = getScreenHeight() / 2 - 8;
const carSpeed = 30;

// async function* shouldClose() {
//   while (true) {
//     await new Promise((r) => setTimeout(r, 16));
//     yield windowShouldClose();
//   }
// }

// for await (const close of shouldClose()) {
//   if (close) {
//     break;
//   }

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------

  const deltaTime = getFrameTime();

  // Frog update
  if (isKeyDown(KeyA)) {
    frog.x -= frogSpeed * deltaTime;
  } else if (isKeyDown(KeyD)) {
    frog.x += frogSpeed * deltaTime;
  }

  if (isKeyDown(KeyW)) {
    frog.y -= frogSpeed * deltaTime;
  } else if (isKeyDown(KeyS)) {
    frog.y += frogSpeed * deltaTime;
  }

  // Car update
  if (car.x < -16) {
    car.x = getScreenWidth();
  } else {
    car.x -= carSpeed * deltaTime;
  }

  // Draw
  // --------------------------------------------------------------------------

  beginDrawing();

  clearBackground(RayWhite);

  frog.render();
  car.render();

  endDrawing();
}

closeWindow();
