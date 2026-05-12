import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  closeWindow,
  DarkGray,
  endDrawing,
  endMode2D,
  initWindow,
  LOG_DEBUG,
  LOG_INFO,
  setTargetFPS,
  setTraceLogLevel,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import { drawEntity } from "./core/draw-entity.ts";
import { Resources } from "./resources.ts";
import { Room1 } from "./rooms/room1.ts";
import { GameContext } from "./game-context.ts";
import { Scene } from "./core/scene.ts";

initWindow({
  title: "Dungeon Heroes",
  width: 1024,
  height: 768,
});

setTargetFPS(60);

setTraceLogLevel(GameContext.isDebug ? LOG_DEBUG : LOG_INFO);

// Load resources
for (const resource of Object.values(Resources)) {
  resource.load();
}

const scene: Scene = new Room1();

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  scene.update();

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(DarkGray);

  beginMode2D(scene.camera.nativeCamera);

  for (const entity of scene.entities) {
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
