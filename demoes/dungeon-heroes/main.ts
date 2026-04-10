import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  closeWindow,
  DarkGray,
  endDrawing,
  endMode2D,
  getScreenHeight,
  getScreenWidth,
  initWindow,
  RaylibCamera,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import { EntityCollection } from "./core/entity-collection.ts";
import { drawEntity } from "./core/drawEntity.ts";
import { Resources } from "./resources.ts";
import { DemoLevel } from "./level.ts";
import { Player } from "./player/player.ts";
import { GameContext } from "./game-context.ts";

const entityCollection = new EntityCollection();

initWindow({
  title: "Dungeon Heroes",
  width: 1024,
  height: 768,
});

setTargetFPS(60);

const camera: RaylibCamera = {
  target: { x: 0, y: 0 },
  offset: {
    x: getScreenWidth() / 2,
    y: getScreenHeight() / 2,
  },
  rotation: 0,
  zoom: 3,
};

// Load resources
for (const resource of Object.values(Resources)) {
  resource.load();
}

const level = new DemoLevel();
level.addLevelEntitiesToCollection(entityCollection);

const player = new Player({
  position: level.playerSpawn,
  level: level,
});
entityCollection.add(player);

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  for (const entity of entityCollection) {
    entity.update();
  }

  camera.target = player.position;

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(DarkGray);

  beginMode2D(camera);

  for (const entity of entityCollection) {
    drawEntity(entity);
  }

  endMode2D();

  if (GameContext.isDebug) {
    drawFPS(0, 0);
  }

  endDrawing();
}

// Unload resources
for (const resource of Object.values(Resources)) {
  resource.unload();
}

closeWindow();
