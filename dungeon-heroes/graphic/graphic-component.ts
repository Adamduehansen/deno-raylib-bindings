import Component from "../entity-component-system/component.ts";
import { Graphic } from "./graphic.ts";

export default class GraphicComponent implements Component {
  constructor(readonly graphic: Graphic) {}
}
