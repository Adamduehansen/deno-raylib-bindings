import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import Component from "./component.ts";

export default class TransformComponent implements Component {
  constructor(public position: RaylibVector) {}
}
