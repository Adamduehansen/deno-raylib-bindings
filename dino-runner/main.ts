// import {
//   beginDrawing,
//   clearBackground,
//   closeWindow,
//   Color,
//   endDrawing,
//   getScreenHeight,
//   getScreenWidth,
//   initWindow,
//   isKeyPressed,
//   isMouseButtonPressed,
//   KeySpace,
//   KeyUp,
//   MouseButtonLeft,
//   setTargetFPS,
//   windowShouldClose,
// } from "@adamduehansen/raylib-bindings/r-core";
// import {
//   checkCollisionRecs,
//   drawRectangleRec,
// } from "@adamduehansen/raylib-bindings/r-shapes";
// import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
// import {
//   Dino,
//   InstructionsLabel,
//   Obstacle,
//   ObstacleFactory,
//   ScoreLabel,
// } from "./entities.ts";

import {
  beginDrawing,
  clearBackground,
  closeWindow,
  Color,
  endDrawing,
  getFrameTime,
  initWindow,
  isKeyDown,
  KeySpace,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import Dino from "./dino.ts";
import Ground from "./ground.ts";
import { RectangleBody, vec } from "@adamduehansen/engine";
import Obstacle from "./obstacle.ts";
import { checkCollisionRecs } from "@adamduehansen/raylib-bindings/r-shapes";
import ScoreLabel from "./score-label.ts";

// const SKY_BLUE: Color = [135, 206, 235, 255];
// const SANDY_BROWN: Color = [244, 164, 96, 255];

// initWindow({
//   title: "Dino Runner",
//   height: 200,
//   width: 800,
// });

// setTargetFPS(60);

// interface Score {
//   value: number;
//   highScore: number;
// }

// const initialScore: Score = {
//   value: 0,
//   highScore: 0,
// };

// const score = new Proxy(initialScore, {
//   get(target: Score, property: keyof Score) {
//     return target[property];
//   },
//   set<T extends keyof Score>(
//     target: Score,
//     property: keyof Score,
//     newValue: Score[T],
//   ) {
//     target[property] = newValue;

//     if (property === "value") {
//       scoreLabel.score = newValue;
//     }

//     return true;
//   },
// });

// let gameState: "waiting" | "playing" | "gameOver" = "waiting";
// let obstacleSpawnTimer = 0;
// let obstacleSpawnRate = 2;
// let minObstacleSpawnRate = 1;
// const initialGameSpeed = 3;
// let gameSpeed = 0;
// const obstacleFactory = new ObstacleFactory();
// let obstacles: Obstacle[] = [];

// const dino = new Dino();
// const scoreLabel = new ScoreLabel();
// const instructionsLabel = new InstructionsLabel();

// function spawnObstacle() {
//   const obstacle = obstacleFactory.get("small");
//   obstacle.pos = { x: getScreenWidth() - 100, y: 150 };
//   obstacles.push(obstacle);
// }

// function startGame(): void {
//   gameState = "playing";
//   score.value = 0;
//   obstacleSpawnTimer = 0;
// }

// function gameOver(): void {
//   gameState = "gameOver";
// }

// function updatePhysics(): void {
//   if (gameState !== "playing") {
//     return;
//   }

//   dino.update();

//   score.value += 0.1;
// }

// function updateObstacles(): void {
//   if (gameState !== "playing") {
//     return;
//   }

//   obstacleSpawnTimer += 1;
//   if (obstacleSpawnTimer >= obstacleSpawnRate) {
//     spawnObstacle();
//     obstacleSpawnTimer = 0;
//   }

//   for (const obstacle of obstacles) {
//     obstacle.pos.x -= gameSpeed;

//     if (obstacle.pos.x + obstacle.width < 0) {
//       obstacles = obstacles.filter((x) => x.id !== obstacle.id);
//     }
//   }
// }

// function updateGameDifficulty(): void {
//   if (gameState !== "playing") {
//     return;
//   }

//   const difficultyLevel = Math.floor(score.value / 200);
//   gameSpeed = initialGameSpeed + difficultyLevel * 0.5;
//   obstacleSpawnRate = Math.max(
//     minObstacleSpawnRate,
//     120 - difficultyLevel * 10,
//   );
// }

// function checkCollision(): void {
//   if (gameState !== "playing") {
//     return;
//   }

//   for (const obstacle of obstacles) {
//     const isOverlapping = checkCollisionRecs({
//       x: dino.pos.x,
//       y: dino.pos.y,
//       width: dino.width,
//       height: dino.height,
//     }, {
//       x: obstacle.pos.x,
//       y: obstacle.pos.y,
//       width: obstacle.width,
//       height: obstacle.height,
//     });

//     if (isOverlapping) {
//       gameOver();
//       return;
//     }
//   }
// }

// function resetGame(): void {
// }

// function handleJump(): void {
//   if (gameState === "waiting") {
//     startGame();
//   } else if (gameState === "playing" && dino.isJumping === false) {
//     dino.jump();
//   } else if (gameState === "gameOver") {
//     resetGame();
//   }
// }

// while (windowShouldClose() === false) {
//   // Update
//   // --------------------------------------------------------------------------
//   if (isKeyPressed(KeySpace) || isKeyPressed(KeyUp)) {
//     handleJump();
//   }

//   if (isMouseButtonPressed(MouseButtonLeft)) {
//     handleJump();
//   }

//   updatePhysics();
//   updateObstacles();
//   checkCollision();

//   updateGameDifficulty()

//   // Draw
//   // --------------------------------------------------------------------------
//   beginDrawing();

//   clearBackground(SKY_BLUE);
//   drawRectangleRec({
//     color: SANDY_BROWN,
//     rectangle: {
//       x: 0,
//       y: 158,
//       width: getScreenWidth(),
//       height: getScreenHeight() - 158,
//     },
//   });

//   // Draw dino
//   for (const obstacle of obstacles) {
//     obstacle.draw();
//   }

//   dino.draw();

//   if (gameState === "waiting") {
//     instructionsLabel.draw();
//   }

//   if (gameState === "gameOver") {
//   }

//   scoreLabel.draw();

//   drawFPS(getScreenWidth() - 80, getScreenHeight() - 25);

//   endDrawing();
// }

// closeWindow();

const SKY_BLUE: Color = [135, 206, 235, 255];

const SCREEN_HEIGHT = 200;
const SCREEN_WIDTH = 800;

initWindow({
  title: "Dino Runner",
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
});

setTargetFPS(60);

// Game entities
const ground = new Ground();
ground.pos = vec(0, 158);
ground.width = SCREEN_WIDTH;
ground.height = SCREEN_HEIGHT - 158;

const dino = new Dino();
dino.pos = vec(50, 150);

const obstacles: Obstacle[] = [];
const obstacle = new Obstacle();
obstacle.pos = vec(SCREEN_WIDTH - 100, SCREEN_HEIGHT - 50);
obstacles.push(obstacle);

// UI entities
const scoreLabel = new ScoreLabel();
scoreLabel.pos = vec(5, 2);

// Game properties
let gameState: "waiting" | "playing" | "gameover" = "waiting";
let obstacleSpawnTimer = 0;
const obstacleSpawnRate = 2;
let score = 0;

// Run game
while (windowShouldClose() === false) {
  // Update game
  // --------------------------------------------------------------------------

  if (isKeyDown(KeySpace) && gameState === "waiting") {
    gameState = "playing";
    score = 0;
  }

  // Main game looop
  if (gameState === "playing") {
    score += 0.1;
    scoreLabel.score = score;

    // Update obstacle spawn rate
    obstacleSpawnTimer += getFrameTime();
    if (obstacleSpawnTimer >= obstacleSpawnRate) {
      const obstacle = new Obstacle();
      obstacle.pos = vec(SCREEN_WIDTH, SCREEN_HEIGHT - 50);
      obstacles.push(obstacle);

      obstacleSpawnTimer = 0;
    }

    // Update entities
    dino.update();
    for (const obstacle of obstacles) {
      obstacle.update();
    }

    // Check collision
    for (const obstacle of obstacles) {
      if (
        dino.body instanceof RectangleBody &&
        obstacle.body instanceof RectangleBody &&
        checkCollisionRecs(dino.body.getBounds(), obstacle.body.getBounds())
      ) {
        gameState = "gameover";
      }
    }
  }

  // Draw game
  // --------------------------------------------------------------------------

  beginDrawing();

  clearBackground(SKY_BLUE);

  // Draw game entities
  ground.draw();
  dino.draw();
  dino.postDraw();
  for (const obstacle of obstacles) {
    obstacle.draw();
    obstacle.postDraw();
  }

  // Draw UI
  scoreLabel.draw();

  endDrawing();
}

closeWindow();
