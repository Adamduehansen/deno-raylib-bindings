import { Color } from "@adamduehansen/raylib-bindings/r-core";
import { Game } from "@adamduehansen/engine";
import GameScene from "./game-scene.ts";

const SKY_BLUE: Color = [135, 206, 235, 255];
const SCREEN_HEIGHT = 200;
const SCREEN_WIDTH = 800;

const game = new Game({
  title: "Dino Runner",
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
  targetFps: 60,
  scenes: {
    "game-scene": new GameScene(),
  },
  background: SKY_BLUE,
});

game.init();
game.run();
game.close();

// Game entities

// // UI entities
// const scoreLabel = new ScoreLabel();
// scoreLabel.pos = vec(5, 2);

// // Game properties

// // Run game
// while (windowShouldClose() === false) {
//   // Update game
//   // --------------------------------------------------------------------------

//   // Draw game
//   // --------------------------------------------------------------------------

//   beginDrawing();

//   clearBackground(SKY_BLUE);

//   // Draw game entities
//   ground.draw();
//   dino.draw();
//   enableDebug && dino.postDraw();
//   for (const obstacle of obstacles) {
//     obstacle.draw();
//     enableDebug && obstacle.postDraw();
//   }

//   // Draw UI
//   scoreLabel.draw();
//   drawFPS(SCREEN_WIDTH - 80, SCREEN_HEIGHT - 20);

//   endDrawing();
// }

// closeWindow();
