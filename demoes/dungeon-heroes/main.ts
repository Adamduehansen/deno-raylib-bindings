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
  LOG_DEBUG,
  LOG_INFO,
  RaylibCamera,
  setTargetFPS,
  setTraceLogLevel,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import { drawEntity } from "./core/draw-entity.ts";
import { Resources } from "./resources.ts";
import { Room1 } from "./rooms/room1.ts";
import { GameContext } from "./game-context.ts";
import { Room } from "./rooms/room.ts";

initWindow({
  title: "Dungeon Heroes",
  width: 1024,
  height: 768,
});

setTargetFPS(60);

setTraceLogLevel(GameContext.isDebug ? LOG_DEBUG : LOG_INFO);

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

const level: Room = new Room1();

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  for (const entity of level.entityCollection) {
    entity.update();
  }

  // TODO: Create a vector utiltiy for ZERO.
  camera.target = level.player?.worldPosition ?? { x: 0, y: 0 };

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(DarkGray);

  beginMode2D(camera);

  for (const entity of level.entityCollection) {
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
