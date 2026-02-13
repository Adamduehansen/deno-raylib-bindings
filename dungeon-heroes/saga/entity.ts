export class Entity {
  static CURRENT_MAX_ID = 1;

  id = Entity.CURRENT_MAX_ID++;

  constructor() {}

  /**
   * This method will be called once each frame.
   */
  update(): void {}
}
