interface Cell {
  x: number;
  y: number;
}

export default class Tile {
  cells: readonly Cell[] = [{
    x: 0,
    y: 0,
  }];

  constructor() {
  }
}
