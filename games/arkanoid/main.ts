import {
  beginDrawing,
  clearBackground,
  closeWindow,
  drawFPS,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "../../raylib-bindings.ts";
import { GameScene } from "./game-scene.ts";
import { GameOverScene } from "./game-over-scene.ts";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;

initWindow({
  title: "Arkanoid",
  height: GAME_HEIGHT,
  width: GAME_WIDTH,
});

setTargetFPS(60);

const gameScene = new GameScene();
gameScene.eventEmitter.on("goToGameOverScene", () => {
  currentScene = "gameOverScene";
});

const gameOverScene = new GameOverScene();
gameOverScene.eventEmitter.on("goToGameScene", () => {
  currentScene = "gameScene";
});

const scenes = {
  gameScene,
  gameOverScene,
};
let currentScene: keyof typeof scenes = "gameOverScene";

while (windowShouldClose() === false) {
  // Update
  // ==========================================================================
  scenes[currentScene].update();

  // Render
  // ==========================================================================
  beginDrawing();
  clearBackground(RayWhite);
  scenes[currentScene].render();
  drawFPS(0, 0);
  endDrawing();
}

closeWindow();
