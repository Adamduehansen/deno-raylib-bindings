import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getFrameTime,
  getMousePosition,
  initWindow,
  isMouseButtonDown,
  isMouseButtonUp,
  MouseButtonLeft,
  MouseButtonRight,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";

initWindow({
  title: "Physics",
  height: 720,
  width: 1280,
});

setTargetFPS(60);

let mousePos = [0, 0];
let mouseDownLeft = false;
let mouseDownRight = false;

while (windowShouldClose() === false) {
  beginDrawing();

  clearBackground(RayWhite);

  const mouse = getMousePosition();
  mousePos = [mouse.x, mouse.y];
  console.log(mousePos);

  if (isMouseButtonDown(MouseButtonLeft)) {
    mouseDownLeft = true;
  }
  if (isMouseButtonUp(MouseButtonLeft)) {
    mouseDownLeft = false;
  }

  if (isMouseButtonDown(MouseButtonRight)) {
    mouseDownRight = true;
  }

  if (isMouseButtonUp(MouseButtonRight)) {
    mouseDownRight = false;
  }

  console.log(mouseDownLeft, mouseDownRight);
  // console.log(getFrameTime());

  endDrawing();
}

closeWindow();
