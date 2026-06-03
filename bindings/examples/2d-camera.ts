import * as r from "@adamduehansen/raylib-bindings";

const maxBuildings = 100;

const screenWidth = 800;
const screenHeight = 450;

r.initWindow({
  width: screenWidth,
  height: screenHeight,
  title: "raylib [core] example - 2d camera",
});

const player: r.RaylibRectangle = {
  x: 400,
  y: 280,
  width: 40,
  height: 40,
};
const buildings: r.RaylibRectangle[] = [];
const buildColors: r.RaylibColor[] = [];

let spacing = 0;

for (let i = 0; i < maxBuildings; i++) {
  const height = r.getRandomValue(100, 800);
  const width = r.getRandomValue(50, 200);
  const building: r.RaylibRectangle = {
    height: height,
    width: width,
    x: -6000 + spacing,
    y: screenHeight - 130 - height,
  };
  buildings.push(building);

  spacing += width;

  buildColors.push([
    r.getRandomValue(200, 240),
    r.getRandomValue(200, 240),
    r.getRandomValue(200, 250),
    255,
  ]);
}

const camera: r.RaylibCamera = {
  target: {
    x: player.x + 20,
    y: player.y + 20,
  },
  offset: {
    x: screenWidth / 2,
    y: screenHeight / 2,
  },
  rotation: 0,
  zoom: 1,
};

r.setTargetFPS(60);

while (r.windowShouldClose() === false) {
  // Update
  // ------------------------------------------------------------------------
  // Player movement
  if (r.isKeyDown(r.KeyRight)) {
    player.x += 2;
  } else if (r.isKeyDown(r.KeyLeft)) {
    player.x -= 2;
  }

  // Camera target follows the player
  camera.target = {
    x: player.x + 20,
    y: player.y + 20,
  };

  // Camera rotation control
  if (r.isKeyDown(r.KeyA)) {
    camera.rotation -= 1;
  } else if (r.isKeyDown(r.KeyS)) {
    camera.rotation += 1;
  }

  // Limit the rotation of the camera
  if (camera.rotation > 40) {
    camera.rotation = 40;
  } else if (camera.rotation < -40) {
    camera.rotation = -40;
  }

  // Camera zoom control
  camera.zoom = Math.exp(Math.log(camera.zoom) + r.getMouseWheelMove() * 0.1);
  if (camera.zoom > 3) {
    camera.zoom = 3;
  } else if (camera.zoom < 0.1) {
    camera.zoom = 0.1;
  }

  // Camera reset (rotation and zoom)
  if (r.isKeyPressed(r.KeyR)) {
    camera.zoom = 1;
    camera.rotation = 0;
  }
  // ------------------------------------------------------------------------

  // DRAWING
  // ------------------------------------------------------------------------

  r.beginDrawing();

  r.clearBackground(r.RayWhite);

  { // Draw player, buildings and camera
    r.beginMode2D(camera);

    r.drawRectangle({
      posX: -6000,
      posY: 320,
      width: 13000,
      height: 8000,
      color: r.DarkGray,
    });

    for (let i = 0; i < buildings.length; i++) {
      const building = buildings[i];
      r.drawRectangleRec({
        color: buildColors[i],
        rectangle: building,
      });
    }

    r.drawRectangleRec({
      rectangle: player,
      color: r.Red,
    });

    r.drawLine({
      startPosX: camera.target.x,
      startPosY: -screenHeight * 10,
      endPosX: camera.target.x,
      endPosY: screenHeight * 10,
      color: r.Green,
    });

    r.drawLine({
      startPosX: -screenWidth * 10,
      startPosY: camera.target.y,
      endPosX: screenWidth * 10,
      endPosY: camera.target.y,
      color: r.Green,
    });

    r.endMode2D();
  }

  { // Draw screen area
    r.drawText({
      text: "SCREEN AREA",
      posX: 640,
      posY: 10,
      fontSize: 20,
      color: r.Red,
    });

    r.drawRectangle({
      posX: 0,
      posY: 0,
      width: screenWidth,
      height: 5,
      color: r.Red,
    });

    r.drawRectangle({
      posX: 0,
      posY: 0,
      width: 5,
      height: screenHeight,
      color: r.Red,
    });

    r.drawRectangle({
      posX: screenWidth - 5,
      posY: 0,
      width: 5,
      height: screenHeight,
      color: r.Red,
    });

    r.drawRectangle({
      posX: 0,
      posY: screenHeight - 5,
      width: screenWidth,
      height: 5,
      color: r.Red,
    });
  }

  { // Draw instructions
    r.drawRectangle({
      posX: 10,
      posY: 10,
      width: 250,
      height: 113,
      color: r.fade(r.SkyBlue, 0.5),
    });

    r.drawRectangleLines({
      posX: 10,
      posY: 10,
      width: 250,
      height: 113,
      color: r.Blue,
    });

    r.drawText({
      text: "Free 2d camera controls:",
      posX: 20,
      posY: 20,
      fontSize: 10,
      color: r.Black,
    });

    r.drawText({
      text: "- Right/Left to move Offset",
      posX: 40,
      posY: 40,
      fontSize: 10,
      color: r.DarkGray,
    });
  }

  r.endDrawing();
}

r.closeWindow();
