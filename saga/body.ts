const BodyKind = {
  rectangle: 0,
  circle: 1,
} as const;

export abstract class Body {
  static Kind = BodyKind;

  abstract readonly kind: number;
}

export class RectangleBody extends Body {
  override kind: number = Body.Kind.rectangle;

  constructor(public width: number, public height: number) {
    super();
  }
}

export class CircleBody extends Body {
  override kind: number = Body.Kind.circle;

  constructor(public radius: number) {
    super();
  }
}
