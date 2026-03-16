import type { Component } from "../ecs/component.ts";
import { Graphic } from "./graphic.ts";

const DEFAULT_GRAPHIC_KEY = "default";

export class GraphicComponent implements Component {
  private _graphicMap: Record<string, Graphic> = {};

  private _currentGraphicKey?: string;

  get current(): Graphic | null {
    if (this._currentGraphicKey === undefined) {
      return null;
    }

    return this._graphicMap[this._currentGraphicKey];
  }

  constructor() {}

  set(graphic: Graphic): void;
  set(key: string, graphic: Graphic): void;
  set(graphicOrKey: string | Graphic, graphicOrUndefined?: Graphic): void {
    let name = DEFAULT_GRAPHIC_KEY;
    let graphic: Graphic | null = null;
    if (
      typeof graphicOrKey === "string" && graphicOrUndefined instanceof Graphic
    ) {
      name = graphicOrKey;
      graphic = graphicOrUndefined;
    } else if (graphicOrKey instanceof Graphic) {
      graphic = graphicOrKey;
    } else {
      throw new Error("Could not set a graphic!");
    }

    this._graphicMap[name] = graphic;

    this.use(name);
  }

  use(key: string): void {
    this._currentGraphicKey = key;
  }
}
