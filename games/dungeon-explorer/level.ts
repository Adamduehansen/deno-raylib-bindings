import Scene from "@src/scene.ts";
import Game from "@src/game.ts";
import Player from "./player.ts";
import Floor from "./floor.ts";
import Health from "./health.ts";
import { vec } from "@src/math.ts";

const PLAYER_MAX_LIFE = 6;

export default class LevelScene extends Scene {
  private _playerLife = PLAYER_MAX_LIFE;
  private _player = new Player();

  override onInitialize(game: Game): void {
    for (let index = 0; index < 4; index++) {
      const floor = new Floor();
      floor.position.x = 8 * index;
      this.entityManager.add(floor);
    }

    this.entityManager.add(this._player);

    const health1 = new Health();
    health1.position = vec(0 + 32, 32);
    const health2 = new Health();
    health2.position = vec(8 * 4 + 32, 32);
    const health3 = new Health();
    health3.position = vec(8 * 8 + 32, 32);

    this.entityManager.add(health1);
    this.entityManager.add(health2);
    this.entityManager.add(health3);

    this.camera = {
      target: {
        x: this._player.position.x,
        y: this._player.position.y,
      },
      offset: {
        x: game.window.width / 2,
        y: game.window.height / 2,
      },
      rotation: 0,
      zoom: 4,
    };
  }

  override onUpdate(game: Game): void {
    super.onUpdate(game);

    this.camera.target = {
      x: this._player.position.x,
      y: this._player.position.y,
    };
  }
}
