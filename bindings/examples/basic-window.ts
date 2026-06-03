import * as r from "@adamduehansen/raylib-bindings";

r.initWindow({
  width: 800,
  height: 450,
  title: "r [core] example - basic window",
});

r.setTargetFPS(60);

while (r.windowShouldClose() === false) {
  r.beginDrawing();
  r.clearBackground(r.White);

  r.drawText({
    text: "Congrats! You created your first window!",
    posX: 190,
    posY: 200,
    fontSize: 20,
    color: r.LightGray,
  });

  r.endDrawing();
}

r.closeWindow();
