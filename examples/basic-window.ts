import { closeWindow, initWindow, windowShouldClose } from "@src/window.ts";
import { setTargetFPS } from "@src/timing.ts";
import { beginDrawing, clearBackground, endDrawing } from "@src/drawing.ts";
import { drawText } from "@src/text.ts";
import { LightGray, White } from "@src/color.ts";

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
