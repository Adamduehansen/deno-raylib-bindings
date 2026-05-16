import Game from "./core/game.ts";
import { Resources } from "./resources.ts";
import { Room1 } from "./rooms/room1.ts";
import { Room2 } from "./rooms/room2.ts";

using game = new Game({
  title: "Dungeon Heroes",
  width: 1024,
  height: 768,
  targetFPS: 60,
  scenes: {
    "0": new Room1(),
    "1": new Room2(),
  },
  resources: Resources,
});

game.start();

// initWindow({
// });

// setTargetFPS(60);

// setTraceLogLevel(GameContext.isDebug ? LOG_DEBUG : LOG_INFO);

// // Load resources
// for (const resource of Object.values(Resources)) {
//   resource.load();
// }

// const scenes: Record<string, Scene> = {
//   "0": new Room1(),
//   "1": new Room2(),
// };

// const currentScene: Scene = scenes["0"];

// while (windowShouldClose() === false) {
//   // Update
//   // --------------------------------------------------------------------------
//   currentScene.update();

//   // Draw
//   // --------------------------------------------------------------------------
//   beginDrawing();

//   clearBackground(DarkGray);

//   beginMode2D(currentScene.camera.nativeCamera);

//   for (const entity of currentScene.entities) {
//     drawEntity(entity);
//   }

//   endMode2D();

//   if (GameContext.isDebug) {
//     drawFPS(0, 0);
//   }

//   endDrawing();
// }

// // Unload resources
// for (const resource of Object.values(Resources)) {
//   resource.unload();
// }

// closeWindow();
