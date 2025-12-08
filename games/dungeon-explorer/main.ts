import Game from "@src/game.ts";
import { ResourceManager } from "@src/resource.ts";
import { Resources } from "./resources.ts";
import LevelScene from "./level.ts";

const screenWidth = 800;
const screenHeight = 450;

const level = new LevelScene();

const game = new Game({
  title: "Dungeon Explorer",
  width: screenWidth,
  height: screenHeight,
  fps: 60,
  resourceManager: new ResourceManager(Object.values(Resources)),
  scenes: {
    "level": level,
  },
  currentScene: "level",
  debug: true,
});

game.initialize();

game.run();

game.close();
