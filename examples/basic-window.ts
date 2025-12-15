import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  LightGray,
  setTargetFPS,
  White,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";

initWindow({
  width: 800,
  height: 450,
  title: "raylib [core] example - basic window",
});

setTargetFPS(60);

while (windowShouldClose() === false) {
  beginDrawing();
  clearBackground(White);

  drawText({
    text: "Congrats! You created your first window!",
    posX: 190,
    posY: 200,
    fontSize: 20,
    color: LightGray,
  });

  endDrawing();
}

closeWindow();
