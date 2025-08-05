const ColorStruct = {
  struct: [
    "u8", // r
    "u8", // g
    "u8", // b
    "u8", // a
  ],
} as const;

const RectangleStruct = {
  struct: [
    "f32", // x
    "f32", // y
    "f32", // width
    "f32", // height
  ],
} as const;

const Camera2DStruct = {
  struct: [
    "f32", // offset.x
    "f32", // offset.y
    "f32", // target.x
    "f32", // target.y
    "f32", // rotation
    "f32", // zoom
  ],
} as const;

const raylib = Deno.dlopen("./lib/libraylib.so.5.5.0", {
  BeginDrawing: {
    parameters: [],
    result: "void",
  },
  BeginMode2D: {
    parameters: [Camera2DStruct],
    result: "void",
  },
  ClearBackground: {
    parameters: [ColorStruct],
    result: "void",
  },
  CloseWindow: {
    parameters: [],
    result: "void",
  },
  DrawLine: {
    parameters: ["i16", "i16", "i16", "i16", ColorStruct],
    result: "void",
  },
  DrawRectangle: {
    parameters: ["i16", "i16", "i16", "i16", ColorStruct],
    result: "void",
  },
  DrawRectangleLines: {
    parameters: ["i16", "i16", "i16", "i16", ColorStruct],
    result: "void",
  },
  DrawRectangleRec: {
    parameters: [RectangleStruct, ColorStruct],
    result: "void",
  },
  DrawText: {
    parameters: ["buffer", "i16", "i16", "i16", ColorStruct],
    result: "void",
  },
  EndDrawing: {
    parameters: [],
    result: "void",
  },
  EndMode2D: {
    parameters: [],
    result: "void",
  },
  Fade: {
    parameters: [ColorStruct, "f32"],
    result: ColorStruct,
  },
  GetCurrentMonitor: {
    parameters: [],
    result: "i32",
  },
  GetMonitorWidth: {
    parameters: ["i32"],
    result: "i32",
  },
  GetMonitorHeight: {
    parameters: ["i32"],
    result: "i32",
  },
  GetMouseWheelMove: {
    parameters: [],
    result: "f32",
  },
  GetRandomValue: {
    parameters: ["i32", "i32"],
    result: "i32",
  },
  InitWindow: {
    parameters: ["i16", "i16", "buffer"],
    result: "void",
  },
  IsWindowFullscreen: {
    parameters: [],
    result: "bool",
  },
  IsGestureDetected: {
    parameters: ["i16"],
    result: "bool",
  },
  IsKeyPressed: {
    parameters: ["i16"],
    result: "bool",
  },
  IsKeyDown: {
    parameters: ["i16"],
    result: "bool",
  },
  SetTargetFPS: {
    parameters: ["i16"],
    result: "void",
  },
  SetWindowSize: {
    parameters: ["i32", "i32"],
    result: "void",
  },
  ToggleFullscreen: {
    parameters: [],
    result: "void",
  },
  WindowShouldClose: {
    parameters: [],
    result: "bool",
  },
});

const cEncoder = new TextEncoder();
function toCString(str: string): Uint8Array {
  return cEncoder.encode(`${str}\0`);
}

function toUint8Array(arr: number[]): Uint8Array {
  return new Uint8Array(arr);
}

function toCamera2DArray(camera: Camera): Float32Array {
  return new Float32Array([
    camera.offset.x,
    camera.offset.y,
    camera.target.x,
    camera.target.y,
    camera.rotation,
    camera.zoom,
  ]);
}

function toUint16Array(arr: number[]): Uint16Array {
  return new Uint16Array(arr);
}

function toFloat32Array(arr: number[]): Float32Array {
  return new Float32Array(arr);
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Vector2 {
  x: number;
  y: number;
}

export interface Camera {
  target: Vector2;
  offset: Vector2;
  rotation: number;
  zoom: number;
}

// Color constants
export type Color = [number, number, number, number];
export const Black: Color = [0, 0, 0, 255];
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

// Key constants
export const KeyA = 65;
export const KeyR = 82;
export const KeyS = 83;
export const KeyEnter = 257;
export const KeyRight = 262;
export const KeyLeft = 263;
export const KeyLeftAlt = 342;
export const KeyRightAlt = 346;

// Gesture and touch contansts
export const GestureTap = 1;

// Window related functions
// ----------------------------------------------------------------------------
export function initWindow(options: {
  width: number;
  height: number;
  title: string;
}): void {
  raylib.symbols.InitWindow(
    options.width,
    options.height,
    toCString(options.title),
  );
}

export function closeWindow(): void {
  raylib.symbols.CloseWindow();
}

export function windowShouldClose(): boolean {
  return raylib.symbols.WindowShouldClose();
}

export function getCurrentMonitor(): number {
  return raylib.symbols.GetCurrentMonitor();
}
export function isWindowFullScreen(): boolean {
  return raylib.symbols.IsWindowFullscreen();
}

export function setWindowSize(width: number, height: number): void {
  raylib.symbols.SetWindowSize(width, height);
}

export function getMonitorWidth(monitor: number): number {
  return raylib.symbols.GetMonitorWidth(monitor);
}

export function getMonitorHeight(monitor: number): number {
  return raylib.symbols.GetMonitorHeight(monitor);
}

export function toggleFullScreen(): void {
  raylib.symbols.ToggleFullscreen();
}

// Drawing related functions
// ----------------------------------------------------------------------------
export function beginDrawing(): void {
  raylib.symbols.BeginDrawing();
}

export function endDrawing(): void {
  raylib.symbols.EndDrawing();
}

export function clearBackground(color: Color): void {
  raylib.symbols.ClearBackground(toUint8Array(color));
}

export function drawLine(args: {
  startPosX: number;
  startPosY: number;
  endPosX: number;
  endPosY: number;
  color: Color;
}): void {
  raylib.symbols.DrawLine(
    args.startPosX,
    args.startPosY,
    args.endPosX,
    args.endPosY,
    toUint8Array(args.color),
  );
}

export function drawRectangle(args: {
  posX: number;
  posY: number;
  width: number;
  height: number;
  color: Color;
}): void {
  raylib.symbols.DrawRectangle(
    args.posX,
    args.posY,
    args.width,
    args.height,
    toUint8Array(args.color),
  );
}

export function drawRectangleLines(args: {
  posX: number;
  posY: number;
  width: number;
  height: number;
  color: Color;
}): void {
  raylib.symbols.DrawRectangleLines(
    args.posX,
    args.posY,
    args.width,
    args.height,
    toUint8Array(args.color),
  );
}

export function drawRectangleRec(rectangle: Rectangle, color: Color): void {
  raylib.symbols.DrawRectangleRec(
    toFloat32Array([
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height,
    ]),
    toUint8Array(color),
  );
}

export function drawText(args: {
  text: string;
  posX: number;
  posY: number;
  fontSize: number;
  color: Color;
}): void {
  raylib.symbols.DrawText(
    toCString(args.text),
    args.posX,
    args.posY,
    args.fontSize,
    toUint8Array(args.color),
  );
}

export function beginMode2D(camera: Camera) {
  return raylib.symbols.BeginMode2D(toCamera2DArray(camera));
}

export function endMode2D(): void {
  raylib.symbols.EndMode2D();
}

// Timing related functions
// ----------------------------------------------------------------------------
export function setTargetFPS(fps: number): void {
  raylib.symbols.SetTargetFPS(fps);
}

// Input related functions: keyboard
export function isKeyPressed(key: number): boolean {
  return raylib.symbols.IsKeyPressed(key);
}

export function isKeyDown(key: number): boolean {
  return raylib.symbols.IsKeyDown(key);
}

export function getMouseWheelMove(): number {
  return raylib.symbols.GetMouseWheelMove();
}

// Gesture and touch handling functions
// ----------------------------------------------------------------------------
export function isGestureDetected(gesture: number): boolean {
  return raylib.symbols.IsGestureDetected(gesture);
}

// Random values generation functions
// ----------------------------------------------------------------------------
export function getRandomValue(min: number, max: number): number {
  return raylib.symbols.GetRandomValue(min, max);
}

// Color/pixel related functions
// ----------------------------------------------------------------------------
export function fade(color: Color, alpha: number): Color {
  const result = raylib.symbols.Fade(toUint8Array(color), alpha);
  return [result[0], result[1], result[2], result[3]];
}
