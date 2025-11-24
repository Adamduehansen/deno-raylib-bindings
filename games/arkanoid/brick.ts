import { DarkGray, Gray, Vector } from "@src/r-core.ts";
import { Entity } from "./engine/entity.ts";
import { Body } from "./engine/physics.ts";
import { RectangleRenderer } from "./engine/renderer.ts";
import { Scene } from "./engine/scene.ts";

interface BrickArgs {
  pos: Vector;
  color: typeof Gray | typeof DarkGray;
}

export class Brick extends Entity {
  static size = 40;

  constructor({ pos, color }: BrickArgs) {
    super({
      pos: pos,
      height: Brick.size,
      width: Brick.size,
      name: "brick",
      body: Body.rectangle(Brick.size, Brick.size),
      renderer: new RectangleRenderer(color),
    });
  }

  override onDestroyed(scene: Scene): void {
    scene.eventEmitter.emit("brick-destroyed");
  }
}
