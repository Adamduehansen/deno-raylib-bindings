import type { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import type { Component } from "../ecs/component.ts";

export class TransformComponent implements Component {
  constructor(public position: RaylibVector) {}
}
