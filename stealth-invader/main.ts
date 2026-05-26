import { Game } from "@adamduehansen/saga";
import { GameScene } from "./game-scene.ts";
import { Resources } from "./resources.ts";

using game = new Game({
  title: "Stealth Invader",
  width: 1024,
  height: 768,
  scenes: {
    "game": new GameScene(),
  },
  resources: Resources,
});

game.start();
