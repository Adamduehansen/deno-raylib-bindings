import {
  getFrameTime,
  isKeyPressed,
  KeySpace,
} from "@adamduehansen/raylib-bindings/r-core";
import { checkCollisionRecs } from "@adamduehansen/raylib-bindings/r-shapes";
import { Game, RectangleBody, Scene } from "@adamduehansen/engine";
import Ground from "./ground.ts";
import Dino from "./dino.ts";
import Obstacle from "./obstacle.ts";
import ScoreLabel from "./score-label.ts";
import IntroductionLabel from "./introduction-label.ts";
import GameOverLabel from "./game-over-label.ts";

const OBSTACLE_MAX_SPAWN_RATE = 2;

export default class GameScene extends Scene {
  private _ground = new Ground();
  private _dino = new Dino();
  private _scoreLabel = new ScoreLabel();
  private _introductionLabel = new IntroductionLabel();
  private _gameOverLabel = new GameOverLabel();

  private _gameState: "waiting" | "playing" | "gameover" = "waiting";
  private _obstacleSpawnTimer = 0;
  private _obstacleSpawnRate = OBSTACLE_MAX_SPAWN_RATE;
  private _obstacleMinRate = 1;
  private _score = 0;
  private _highscore = 0;

  override initialize(game: Game): void {
    super.initialize(game);

    this.entities.add(this._ground);
    this.entities.add(this._dino);
    this.entities.add(this._scoreLabel);
    this.entities.add(this._introductionLabel);
    this.entities.add(this._gameOverLabel);

    this.events.on("game_started", () => {
      this.entities.add(new Obstacle());
    });

    this.events.on("game_ended", () => {
      if (this._score <= this._highscore) {
        return;
      }

      this._highscore = this._score;
      this.events.emit("new_highscore", this._highscore);
    });
  }

  override update(): void {
    super.update();

    if (isKeyPressed(KeySpace)) {
      if (this._gameState === "waiting") {
        this._gameState = "playing";
        this._obstacleSpawnTimer = 0;
        this._obstacleSpawnRate = OBSTACLE_MAX_SPAWN_RATE;
        this.events.emit("game_started");
      } else if (this._gameState === "gameover") {
        this._gameState = "waiting";
        this._score = 0;
        const obstacles = this.entities.filter(({ name }) =>
          name !== undefined && name.includes("obstacle")
        );
        for (const obstacle of obstacles) {
          this.entities.remove(obstacle.id);
        }
        this.events.emit("game_waiting");
      }
    }

    // Main game looop
    if (this._gameState === "playing") {
      this._score += 0.1;
      this._scoreLabel.score = this._score;
      this._obstacleSpawnRate -= 0.001;

      // Update obstacle spawn rate
      this._obstacleSpawnTimer += getFrameTime();
      if (
        this._obstacleSpawnTimer >=
          Math.max(this._obstacleSpawnRate, this._obstacleMinRate)
      ) {
        const obstacle = new Obstacle();
        this.entities.add(obstacle);

        this._obstacleSpawnTimer = 0;
      }

      // Check collision
      const obstacles = this.entities.filter((entity) =>
        entity.name !== undefined && entity.name?.includes("obstacle")
      );
      for (const obstacle of obstacles) {
        if (
          this._dino.body instanceof RectangleBody &&
          obstacle.body instanceof RectangleBody &&
          checkCollisionRecs(
            this._dino.body.getBounds(),
            obstacle.body.getBounds(),
          )
        ) {
          this._gameState = "gameover";
          this.events.emit("game_ended");
        }
      }
    }
  }
}
