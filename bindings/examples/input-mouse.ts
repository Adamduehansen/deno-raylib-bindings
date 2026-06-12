import * as r from "../mod.ts"; 

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 450;

r.initWindow({
  title: "raylib [core] example - input mouse",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});

let ballPosition: r.RaylibVector = {
  x: -100,
  y: -100,
};

let ballColor: r.RaylibColor = r.DarkBlue;

r.setTargetFPS(60);

while(r.windowShouldClose() === false) {
  // Update
  // ---------------------------------------------------------------------------
  if (r.isKeyPressed(r.KeyH)) {
    if (r.isCursorHidden()) {
      r.showCursor();
    } else {
      r.hideCursor();
    }
  }

  ballPosition = r.getMousePosition();

  if (r.isMouseButtonPressed(r.MouseButtonLeft)) {
    ballColor = r.Maroon;
  } else if (r.isMouseButtonPressed(r.MouseButtonMiddle)) {
    ballColor = r.Lime;
  } else if (r.isMouseButtonPressed(r.MouseButtonRight)) {
    ballColor = r.DarkBlue;
  } else if (r.isMouseButtonPressed(r.MouseButtonSide)) {
    ballColor = r.Purple;
  } else if (r.isMouseButtonPressed(r.MouseButtonExtra)) {
    ballColor = r.Yellow;
  } else if (r.isMouseButtonPressed(r.MouseButtonForward)) {
    ballColor = r.Orange;
  } else if (r.isMouseButtonPressed(r.MouseButtonBack)) {
    ballColor = r.Beige;
  }

  // Update
  // ---------------------------------------------------------------------------
  r.beginDrawing();

  r.clearBackground(r.RayWhite);

  r.drawCircleV({
    center: ballPosition,
    color: ballColor,
    radius: 40,
  });

  r.drawText({
    text: "Move the ball with the mouse and click mouse button to change color",
    posX: 10,
    posY: 10,
    fontSize: 20,
    color: r.DarkGray,
  });

  r.drawText({
    text: "Press 'H' to toggle cursor visibility",
    posX: 10,
    posY: 30,
    fontSize: 20,
    color: r.DarkGray,
  });

  if (r.isCursorHidden()) {
    r.drawText({
      text: "CURSOR HIDDEN",
      posX: 20,
      posY: 60,
      fontSize: 20,
      color: r.Red
    });
  } else {
    r.drawText({
      text: "CURSOR VISIBLE",
      posX: 20,
      posY: 60,
      fontSize: 20,
      color: r.Green
    })
  }

  r.endDrawing();
}

r.closeWindow();
