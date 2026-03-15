import type { Component } from "../ecs/component.ts";
import type { Graphic } from "./graphic.ts";

export class GraphicComponent implements Component {
  constructor(readonly graphic: Graphic) {}
}
