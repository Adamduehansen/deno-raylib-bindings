import Component from "./component.ts";

export default class PointerComponent implements Component {
  constructor(
    public onMouseEnter: () => void = () => {},
    public onMouseExit: () => void = () => {},
    public onMouseOver: () => void = () => {},
  ) {}
}