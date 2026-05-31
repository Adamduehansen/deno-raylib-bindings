import * as r from "@adamduehansen/raylib-bindings";

const SCREEN_HEIGHT = 450;
const SCREEN_WIDTH = 800;

r.initWindow({
  title: "raylib [core] example - input keys",
  height: 450,
  width: 800,
});

const ballPosition: r.RaylibVector = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT / 2,
};

r.setTargetFPS(60);

while (r.windowShouldClose() === false) {
  // Update
  //---------------------------------------------------------------------------
  if (r.isKeyDown(r.KeyRight)) {
    ballPosition.x += 2;
  }
  if (r.isKeyDown(r.KeyLeft)) {
    ballPosition.x -= 2;
  }
  if (r.isKeyDown(r.KeyUp)) {
    ballPosition.y -= 2;
  }
  if (r.isKeyDown(r.KeyDown)) {
    ballPosition.y += 2;
  }
  //---------------------------------------------------------------------------

  // Draw
  //---------------------------------------------------------------------------
  r.beginDrawing();

  r.clearBackground(r.RayWhite);

  r.drawText({
    text: "move the ball with arrow keys",
    posX: 10,
    posY: 10,
    fontSize: 20,
    color: r.DarkGray,
  });

  r.drawCircleV({
    center: ballPosition,
    color: r.Maroon,
    radius: 50,
  });

  r.endDrawing();
}

r.closeWindow();
