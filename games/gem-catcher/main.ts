import {
  beginDrawing,
  closeWindow,
  drawTexture,
  endDrawing,
  getScreenHeight,
  getScreenWidth,
  initWindow,
  loadTexture,
  setTargetFPS,
  unloadTexture,
  White,
  windowShouldClose,
} from "../../raylib-bindings.ts";

initWindow({
  title: "Gem Catcher",
  width: 1152,
  height: 648,
});

const PaddleWidth = 104;

const bgTexture = loadTexture("./games/gem-catcher/assets/GameBg.png");
const paddleTexture = loadTexture("./games/gem-catcher/assets/paddleBlu.png");

setTargetFPS(60);

interface Vector {
  x: number;
  y: number;
}

interface EntityArgs {
  pos: Vector;
}

abstract class Entity {
  pos: Vector;

  constructor(args: EntityArgs) {
    this.pos = args.pos;
  }

  abstract render(): void;
}

class PlayerPaddle extends Entity {
  override render(): void {
    drawTexture({
      texture: paddleTexture,
      x: this.pos.x,
      y: this.pos.y,
      color: White,
    });
  }
}

class World {
  #entities: Entity[] = [];

  get entities(): readonly Entity[] {
    return this.#entities;
  }

  add(entity: Entity): void {
    this.#entities.push(entity);
  }
}

const world = new World();
const playerPaddle = new PlayerPaddle({
  pos: {
    x: getScreenWidth() / 2 - PaddleWidth / 2,
    y: getScreenHeight() - 50,
  },
});

world.add(playerPaddle);

while (windowShouldClose() === false) {
  // Drawing
  // --------------------------------------------------------------------------
  beginDrawing();
  drawTexture({
    texture: bgTexture,
    x: 0,
    y: 0,
    color: White,
  });

  for (const entity of world.entities) {
    entity.render();
  }

  endDrawing();
}

unloadTexture(paddleTexture);
unloadTexture(bgTexture);

closeWindow();
