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

await game.init();
game.run();
game.close();
