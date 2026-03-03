import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { Graphic } from "./graphic.ts";

export interface Component {}

export type ComponentCtor<TComponent extends Component = Component> = new (
  ...args: any[]
) => TComponent;

export class GraphicComponent implements Component {
  constructor(readonly graphic: Graphic) {}
}

export class TransformComponent implements Component {
  constructor(public position: RaylibVector) {}
}
