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
import ResourceManager, { TextureResource } from "./resource-manager.ts";
import { Level1 } from "./level.ts";
import { drawFPS } from "@src/r-text.ts";

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
  new TextureResource("./games/dungeon-explorer/spritesheet.png"),
);

const level = new Level1();

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  level.update();

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(Black);

  drawFPS(0, 0);

  level.render();

  endDrawing();
}

ResourceManager.getInstance().unload();

closeWindow();
