import {
  beginDrawing,
  clearBackground,
  closeWindow,
  DarkGray,
  endDrawing,
  initWindow,
  isKeyDown,
  KeyDown,
  KeyLeft,
  KeyRight,
  KeyUp,
  Maroon,
  type RaylibVector,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawCircleV } from "@adamduehansen/raylib-bindings/r-shapes";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";

const SCREEN_HEIGHT = 450;
const SCREEN_WIDTH = 800;

initWindow({
  title: "raylib [core] example - input keys",
  height: 450,
  width: 800,
});

const ballPosition: RaylibVector = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT / 2,
};

setTargetFPS(60);

while (windowShouldClose() === false) {
  // Update
  //---------------------------------------------------------------------------
  if (isKeyDown(KeyRight)) {
    ballPosition.x += 2;
  }
  if (isKeyDown(KeyLeft)) {
    ballPosition.x -= 2;
  }
  if (isKeyDown(KeyUp)) {
    ballPosition.y -= 2;
  }
  if (isKeyDown(KeyDown)) {
    ballPosition.y += 2;
  }
  //---------------------------------------------------------------------------

  // Draw
  //---------------------------------------------------------------------------
  beginDrawing();

  clearBackground(RayWhite);

  drawText({
    text: "move the ball with arrow keys",
    posX: 10,
    posY: 10,
    fontSize: 20,
    color: DarkGray,
  });

  drawCircleV({
    center: ballPosition,
    color: Maroon,
    radius: 50,
  });

  endDrawing();
}

closeWindow();
