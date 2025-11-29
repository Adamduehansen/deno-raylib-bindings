import {
  beginDrawing,
  beginMode2D,
  Black,
  Camera,
  clearBackground,
  closeWindow,
  endDrawing,
  endMode2D,
  initWindow,
  setTargetFPS,
  windowShouldClose,
} from "@src/r-core.ts";
import { Beholder, Player } from "./entity.ts";
import ResourceManager, {
  TextureResource,
  TiledResource,
} from "./resource-manager.ts";
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
  new TextureResource("./games/dungeon-explorer/spritesheet.png"),
);

ResourceManager.getInstance().load(
  "level1",
  new TiledResource("./games/dungeon-explorer/level1.tmx"),
);

const player = new Player({
  position: vec(0, 0),
});
const beholder = new Beholder({
  position: vec(10, 10),
});

const camera: Camera = {
  target: {
    x: player.position.x,
    y: player.position.y,
  },
  offset: {
    x: screenWidth / 2,
    y: screenHeight / 2,
  },
  rotation: 0,
  zoom: 4,
};

const level1Map = ResourceManager.getInstance().get("level1");
console.log(level1Map);

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  player.update();
  beholder.update();

  camera.target = {
    x: player.position.x,
    y: player.position.y,
  };

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(Black);

  beginMode2D(camera);

  player.render();
  beholder.render();

  endMode2D();

  endDrawing();
}

ResourceManager.getInstance().unload();

closeWindow();
