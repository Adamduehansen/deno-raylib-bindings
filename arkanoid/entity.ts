import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { vec } from "./vector.ts";

export default abstract class Entity {
  pos: RaylibVector = vec(0, 0);

  abstract update(): void;
  abstract draw(): void;
}
