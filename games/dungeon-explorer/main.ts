import {
  beginDrawing,
  Black,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  setTargetFPS,
  windowShouldClose,
} from "@src/r-core.ts";
import { Beholder, Player } from "./entity.ts";
import ResourceManager from "./resource-manager.ts";
import { vec } from "@src/math.ts";

const screenWidth = 800;
const screenHeight = 450;

initWindow({
  title: "Dungeon Explorer",
  width: screenWidth,
  height: screenHeight,
});

setTargetFPS(60);

ResourceManager.getInstance().load(
  "spritesheet",
  "./games/dungeon-explorer/spritesheet.png",
);

const player = new Player({
  vector: vec(0, 0),
});
const beholder = new Beholder({
  vector: vec(10, 10),
});

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  player.update();
  beholder.update();

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(Black);

  player.render();
  beholder.render();

  endDrawing();
}

ResourceManager.getInstance().unload();

closeWindow();
