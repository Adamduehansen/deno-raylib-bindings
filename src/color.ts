export type Color = [number, number, number, number];

export const Black: Color = [0, 0, 0, 255];
export const Blank: Color = [0, 0, 0, 0];
export const Blue: Color = [0, 121, 241, 255];
export const DarkBlue: Color = [0, 82, 172, 255];
export const DarkGray: Color = [80, 80, 80, 255];
export const DarkGreen: Color = [0, 117, 44, 255];
export const Gray: Color = [130, 130, 130, 255];
export const Green: Color = [0, 228, 48, 255];
export const LightGray: Color = [200, 200, 200, 255];
export const Maroon: Color = [190, 33, 55, 255];
export const Purple: Color = [200, 122, 255, 255];
export const RayWhite: Color = [245, 245, 245, 255];
export const Red: Color = [230, 41, 55, 255];
export const SkyBlue: Color = [102, 191, 255, 255];
export const White: Color = [255, 255, 255, 255];

export function toRaylibColor(arr: number[]): BufferSource {
  return new Uint8Array(arr);
}
