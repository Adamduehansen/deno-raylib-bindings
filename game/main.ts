import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";
import Game from "./core/game.ts";
import { Resources } from "./resources.ts";
import { GameScene } from "./scenes/game-scene.ts";

using game = new Game({
  title: "Dungeon Heroes",
  width: 1024,
  height: 768,
  targetFPS: 60,
  scenes: {
    "game": new GameScene(),
  },
  resources: Resources,
  backgroundColor: DarkGray,
});

game.start();
