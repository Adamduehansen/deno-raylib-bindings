// interface Cell {
//   tilesetId: number;
//   pos: {
//     x: number;
//     y: number;
//   };
// }

export default class Tile {
  cells: readonly number[][] = [
    [0, 51, 51, 52, 51, 51, 53, 0],
    [51, 49, 49, 49, 49, 49, 2147483702, 51],
    [50, 49, 49, 49, 49, 43, 49, 49],
    [0, 49, 50, 49, 49, 49, 49, 0],
    [0, 49, 49, 49, 49, 49, 49, 0],
  ];

  constructor() {
  }
}
