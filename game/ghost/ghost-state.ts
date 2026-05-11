import { Ghost } from "./ghost.ts";

export abstract class GhostState {
  constructor(readonly ghost: Ghost) {}

  abstract update(): GhostState | null;
}

export class IdleState extends GhostState {
  override update(): GhostState | null {
    return null;
  }
}

export class MovingState extends GhostState {
  override update(): GhostState | null {
    return null;
  }
}
