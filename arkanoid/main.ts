import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";

initWindow({
  title: "",
  height: 450,
  width: 800,
});

setTargetFPS(60);

while (windowShouldClose() === false) {
  beginDrawing();

  clearBackground(RayWhite);

  endDrawing();
}

closeWindow();
