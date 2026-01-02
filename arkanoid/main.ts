import { RayWhite } from "@adamduehansen/raylib-bindings/r-core";
import { Game } from "@adamduehansen/engine";
import { GameScene } from "./scenes/game-scene.ts";
import { EndScene } from "./scenes/end-scene.ts";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 450;

const game = new Game({
  title: "Arkanoid",
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
  targetFps: 60,
  scenes: {
    "game-scene": new GameScene(),
    "end-scene": new EndScene(),
  },
  background: RayWhite,
});
game.init();
game.run();
game.close();
