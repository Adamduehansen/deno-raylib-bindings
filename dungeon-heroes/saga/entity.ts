let entityIdentifier = 1;

export class Entity {
  id = entityIdentifier++;

  constructor() {}

  /**
   * This method will be called once each frame.
   */
  update(): void {}
}
