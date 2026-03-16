import {
  type RaylibColor,
  type RaylibVector,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import {
  Entity,
  GraphicComponent,
  Rectangle,
  TransformComponent,
} from "@adamduehansen/saga";

interface ActorArgs {
  /**
   * Set the x position of the actor.
   *
   * @default 0
   */
  x?: number;

  /**
   * Set the y position of the actor.
   *
   * @default 0
   */
  y?: number;

  /**
   * Set the width of the actor.
   *
   * @default 0
   */
  width?: number;

  /**
   * Set the height of the actor
   *
   * @default 0
   */
  height?: number;

  /**
   * Set the color of the actor.
   *
   * @default {@linkcode RayWhite}
   */
  color?: RaylibColor;
}

export class Actor extends Entity {
  public transform: TransformComponent;
  public graphic: GraphicComponent;

  set position(newPos: RaylibVector) {
    this.transform.position = newPos;
  }

  get position(): RaylibVector {
    return this.transform.position;
  }

  constructor(args?: ActorArgs) {
    super();

    const { width = 0, height = 0, color = RayWhite } = { ...args };

    this.transform = new TransformComponent({
      x: args?.x ?? 0,
      y: args?.y ?? 0,
    });

    this.graphic = new GraphicComponent();

    // Set a default graphic based on constructor args.
    if (height > 0 && width > 0) {
      this.graphic.set(
        new Rectangle(width, height, color),
      );
    }
  }
}
