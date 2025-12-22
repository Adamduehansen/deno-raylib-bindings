import {
  beginDrawing,
  clearBackground,
  closeWindow,
  Color,
  endDrawing,
  getScreenHeight,
  getScreenWidth,
  initWindow,
  isKeyPressed,
  isMouseButtonPressed,
  KeySpace,
  KeyUp,
  MouseButtonLeft,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import Dino, { InstructionsLabel, ScoreLabel } from "./entities.ts";

const SKY_BLUE: Color = [135, 206, 235, 255];
const SANDY_BROWN: Color = [244, 164, 96, 255];

initWindow({
  title: "Dino Runner",
  height: 200,
  width: 800,
});

setTargetFPS(60);

let gameState: "waiting" | "playing" | "gameOver" = "waiting";

interface Score {
  value: number;
}

const initialScore: Score = { value: 0 };
const score = new Proxy(initialScore, {
  get(target: Score, property: keyof Score) {
    return target[property];
  },
  set<T extends keyof Score>(
    target: Score,
    property: keyof Score,
    newValue: Score[T],
  ) {
    target[property] = newValue;
    scoreLabel.score = newValue;
    return true;
  },
});

const dino = new Dino();
const scoreLabel = new ScoreLabel();
const instructionsLabel = new InstructionsLabel();

function startGame(): void {
  gameState = "playing";
  score.value = 0;
}

function updatePhysics(): void {
  if (gameState !== "playing") {
    return;
  }

  dino.update();

  score.value += 0.1;
}

function resetGame(): void {
}

function handleJump(): void {
  if (gameState === "waiting") {
    startGame();
  } else if (gameState === "playing" && dino.isJumping === false) {
    dino.jump();
  } else if (gameState === "gameOver") {
    resetGame();
  }
}

while (windowShouldClose() === false) {
  // Update
  // --------------------------------------------------------------------------
  if (isKeyPressed(KeySpace) || isKeyPressed(KeyUp)) {
    handleJump();
  }

  if (isMouseButtonPressed(MouseButtonLeft)) {
    handleJump();
  }

  updatePhysics();

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();

  clearBackground(SKY_BLUE);
  drawRectangleRec({
    color: SANDY_BROWN,
    rectangle: {
      x: 0,
      y: 158,
      width: getScreenWidth(),
      height: getScreenHeight() - 158,
    },
  });

  // Draw dino
  dino.draw();
  scoreLabel.draw();

  if (gameState === "waiting") {
    instructionsLabel.draw();
  }

  drawFPS(getScreenWidth() - 80, getScreenHeight() - 25);

  endDrawing();
}

closeWindow();
