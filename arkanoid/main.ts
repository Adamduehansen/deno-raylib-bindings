import { RayWhite } from "@adamduehansen/raylib-bindings/r-core";
import { Game } from "@adamduehansen/engine";
import StartScene from "./scenes/start-scene/start-scene.ts";
import { GameOverScene } from "./scenes/game-over-scene.ts";
import Level1Scene from "./scenes/level-scene/level-1-scene.ts";
import Level2Scene from "./scenes/level-scene/level-2-scene.ts";
import Level3Scene from "./scenes/level-scene/level-3-scene.ts";

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 450;

const game = new Game({
  title: "Arkanoid",
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
  targetFps: 60,
  scenes: {
    "start": new StartScene(),
    "level-1": new Level1Scene(),
    "level-2": new Level2Scene(),
    "level-3": new Level3Scene(),
    "game-over": new GameOverScene(),
  },
  background: RayWhite,
});
game.init();
game.run();
game.close();
