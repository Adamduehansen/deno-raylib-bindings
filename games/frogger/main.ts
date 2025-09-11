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
  isKeyPressed,
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

const FrogSize = 16;

initWindow({
  title: "Frogger",
  height: 240,
  width: 160,
});

setTargetFPS(60);

const frog = new Frog();
frog.x = 0;
frog.y = getScreenHeight() - FrogSize;

const car = new Car();
car.x = getScreenWidth();
car.y = getScreenHeight() / 2 - 8;
const carSpeed = 30;

// async function* shouldClose() {
//   while (true) {
//     await new Promise((r) => setTimeout(r, FrogSize));
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
  if (isKeyPressed(KeyA)) {
    frog.x -= FrogSize;
  } else if (isKeyPressed(KeyD)) {
    frog.x += FrogSize;
  }

  if (isKeyPressed(KeyW)) {
    frog.y -= FrogSize;
  } else if (isKeyPressed(KeyS)) {
    frog.y += FrogSize;
  }

  // Car update
  if (car.x < -FrogSize) {
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
