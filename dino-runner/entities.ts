import {
  Black,
  DarkGray,
  DarkGreen,
  getScreenHeight,
  getScreenWidth,
  Green,
  RaylibVector,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import {
  drawRectangle,
  drawRectangleRec,
} from "@adamduehansen/raylib-bindings/r-shapes";
import {
  drawText,
  drawTextEx,
  getFontDefault,
  measureText,
} from "@adamduehansen/raylib-bindings/r-text";

abstract class Entity {
  abstract update(): void;
  abstract draw(): void;
}

// Dino
// ----------------------------------------------------------------------------

const JUMP_STRENGTH = -12;
const GRAVITY = 0.6;
const GROUND_Y = 150;

export class Dino extends Entity {
  pos: RaylibVector = {
    x: 50,
    y: 150,
  };

  readonly width = 40;
  readonly height = 40;

  private _velocityY = 0;

  isJumping = false;

  override update(): void {
    this._velocityY += GRAVITY;
    this.pos.y += this._velocityY;

    if (this.pos.y > GROUND_Y) {
      this.pos.y = GROUND_Y;
      this._velocityY = 0;
      this.isJumping = false;
    }
  }

  override draw(): void {
    drawRectangleRec({
      color: Green,
      rectangle: {
        x: this.pos.x,
        y: this.pos.y,
        width: this.width,
        height: this.height,
      },
    });
    drawRectangleRec({
      color: DarkGreen,
      rectangle: {
        x: this.pos.x + 25,
        y: this.pos.y + 8,
        width: 4,
        height: 4,
      },
    });
    drawRectangleRec({
      color: DarkGreen,
      rectangle: {
        x: this.pos.x + 30,
        y: this.pos.y + 20,
        width: 8,
        height: 2,
      },
    });

    if (this.isJumping === false) {
      drawRectangleRec({
        color: Green,
        rectangle: {
          x: this.pos.x + 10,
          y: this.pos.y + 40,
          width: 6,
          height: 8,
        },
      });

      drawRectangleRec({
        color: Green,
        rectangle: {
          x: this.pos.x + 24,
          y: this.pos.y + 40,
          width: 6,
          height: 8,
        },
      });
    }
  }

  jump(): void {
    if (this.isJumping === false) {
      this._velocityY = JUMP_STRENGTH;
      this.isJumping = true;
    }
  }
}

// Obstacle
// ----------------------------------------------------------------------------

interface ObstacleArgs {
  width: number;
  height: number;
  type: "small" | "medium" | "wide";
}

let obstacleId = 0;

export class Obstacle extends Entity {
  pos: RaylibVector = {
    x: 0,
    y: 0,
  };

  readonly id = obstacleId++;
  readonly width: number;
  readonly height: number;

  constructor(args: ObstacleArgs) {
    super();
    this.width = args.width;
    this.height = args.height;
  }

  override update(): void {}
  override draw(): void {
    drawRectangleRec({
      color: Green,
      rectangle: {
        x: this.pos.x,
        y: this.pos.y,
        height: this.height,
        width: this.width,
      },
    });
  }
}

export class ObstacleFactory {
  get(type: ObstacleArgs["type"]): Obstacle | never {
    switch (type) {
      case "small":
        return new Obstacle({
          width: 20,
          height: 40,
          type: "small",
        });
      case "medium":
        return new Obstacle({
          width: 25,
          height: 50,
          type: "small",
        });
      case "wide":
        return new Obstacle({
          width: 30,
          height: 35,
          type: "small",
        });
    }
  }
}

// ScoreLabel
// ----------------------------------------------------------------------------

export class ScoreLabel extends Entity {
  score = 0;

  override update(): void {}

  override draw(): void {
    drawRectangle({
      color: RayWhite,
      posX: 0,
      posY: 0,
      width: 150,
      height: 40,
    });
    drawText({
      color: DarkGray,
      fontSize: 18,
      posX: 10,
      posY: 10,
      text: `Score: ${this.score.toFixed(0)}`,
    });
  }
}

// InstructionsLabel
// ----------------------------------------------------------------------------

export class InstructionsLabel extends Entity {
  override update(): void {}

  override draw(): void {
    const defaultFont = getFontDefault();

    drawTextEx({
      text: "Press SPACE or Up to jump!",
      font: defaultFont,
      fontSize: 24,
      position: {
        x: getScreenWidth() / 2 -
          measureText("Press SPACE or Up to jump!", 24) / 2,
        y: getScreenHeight() / 2 - 20,
      },
      spacing: 1,
      tint: Black,
    });

    drawTextEx({
      text: "Click anywhere to start",
      font: defaultFont,
      fontSize: 16,
      position: {
        x: getScreenWidth() / 2 -
          measureText("Click anywhere to start", 16) / 2,
        y: getScreenHeight() / 2 + 20,
      },
      spacing: 1,
      tint: Black,
    });
  }
}
