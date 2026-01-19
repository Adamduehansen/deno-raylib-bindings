import {
  KeySpace,
  LOG_INFO,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { Game, Scene, vec } from "@adamduehansen/engine";
import Paddle from "./paddle.ts";
import Ball from "./ball.ts";
import PressToStartLabel from "./press-to-start-label.ts";
import Brick from "./brick.ts";
import { LevelParser, TextLevelParser } from "../../level-parser.ts";
import Life from "./life.ts";

const MAX_LIFES = 2;

export default abstract class LevelScene extends Scene {
  private readonly _paddle = new Paddle();
  private readonly _ball = new Ball();
  private readonly _pressToStartLabel = new PressToStartLabel();
  private readonly _bricks: Brick[] = [];

  private readonly levelParser: LevelParser;

  private _currentAmountOfLifes = 0;
  private _isActive = false;

  constructor(levelData: string) {
    super();
    this.levelParser = new TextLevelParser(levelData);

    const { bricks } = this.levelParser.parse();
    this._bricks = bricks;
  }

  override onInitialize(game: Game): void {
    super.onInitialize(game);

    // Add entities to scene.
    this.entities.add(this._paddle);
    this.entities.add(this._ball);
    this.entities.add(this._pressToStartLabel);

    // Attach event listeners
    this.events.on("start_game", this._onStartGame.bind(this));
    this.events.on("brick_hit", this._onBrickHit.bind(this));
    this.events.on("life_lost", this._onLifeLost.bind(this));
  }

  override onActivate(scene: Scene): void {
    super.onActivate(scene);

    this._currentAmountOfLifes = MAX_LIFES;
    for (let i = 0; i < this._currentAmountOfLifes; i++) {
      const life = new Life();
      life.pos = vec(10 + i * life.width + i * 10, scene.game.height - 30);
      this.entities.add(life);
    }

    for (const brick of this._bricks) {
      this.entities.add(brick);
    }
    this._isActive = false;
  }

  override onDeactivated(): void {
    super.onDeactivated();

    // Clean up the scene.
    const remainingBricks = this.entities.filter((entity) =>
      entity.name === "brick"
    );
    for (const brick of remainingBricks) {
      this.entities.remove(brick.id);
    }
    const remainingLifes = this.entities.filter((entity) =>
      entity.name === "life"
    );
    for (const life of remainingLifes) {
      this.entities.remove(life.id);
    }
  }

  override onKeyPress(key: number, _scene: Scene): void {
    if (key === KeySpace && this._isActive === false) {
      this.events.emit("start_game");
      this._isActive = true;
    }
  }

  private _onBrickHit(data: unknown) {
    if (typeof data !== "number") {
      return;
    }

    this.entities.remove(data);

    const remainingBricks = this.entities.filter((entity) =>
      entity.name === "brick"
    );
    if (remainingBricks.length > 0) {
      return;
    }

    this.game.goToScene(this.getNextLevelName());
  }

  private _onStartGame() {
    traceLog(LOG_INFO, "Game is started");
  }

  private _onLifeLost() {
    this._currentAmountOfLifes -= 1;
    const nextLifeBlockToRemove = this.entities.filter((entity) =>
      entity.name === "life"
    ).at(-1);

    if (nextLifeBlockToRemove !== undefined) {
      this.entities.remove(nextLifeBlockToRemove.id);
    }
    this._isActive = false;

    if (this._currentAmountOfLifes > 0) {
      return;
    }

    this.game.goToScene("game-over");
  }

  abstract getNextLevelName(): string;
}
