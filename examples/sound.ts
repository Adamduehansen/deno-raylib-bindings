import {
  beginDrawing,
  Black,
  clearBackground,
  closeAudioDevice,
  closeWindow,
  drawText,
  endDrawing,
  getFrameTime,
  getScreenHeight,
  getScreenWidth,
  initAudioDevice,
  initWindow,
  loadSound,
  measureText,
  playSound,
  RayWhite,
  setTargetFPS,
  unloadSound,
  windowShouldClose,
} from "../raylib-bindings.ts";

type TimerCallback = () => void;

interface TimerOptions {
  ms: number;
  callback: TimerCallback;
  repeat?: boolean;
}

class Timer {
  /**
   * The amount of milliseconds.
   */
  readonly ms: number;

  /**
   * The amount of milliseconds that has passed since the timer was activated.
   */
  get elapsed(): number {
    return this.#elapsed;
  }

  #elapsed: number = 0;
  #running: boolean = false;

  #callback: TimerCallback;
  #repeat: boolean;

  constructor(options: TimerOptions) {
    this.ms = options.ms;
    this.#callback = options.callback;
    this.#repeat = options.repeat ?? false;
  }

  start(): void {
    this.#running = true;
  }

  update(): void {
    if (this.#running === false) {
      return;
    }

    const frameTimeInMs = getFrameTime() * 1000;
    this.#elapsed += frameTimeInMs;

    if (this.#elapsed > this.ms) {
      if (this.#repeat === false) {
        this.#running = false;
      } else {
        this.#elapsed = 0;
      }
      this.#callback();
    }
  }
}

initWindow({
  title: "Sound example",
  width: 800,
  height: 450,
});

setTargetFPS(60);

initAudioDevice();

const boomSound = loadSound("./examples/resources/boom.wav");

function playBoomSound(): void {
  playSound(boomSound);
}

const timer = new Timer({
  ms: 2000,
  callback: playBoomSound,
  repeat: true,
});
timer.start();

playBoomSound();

while (windowShouldClose() === false) {
  // Update
  // ==========================================================================
  timer.update();

  // Draw
  // ==========================================================================
  beginDrawing();

  clearBackground(RayWhite);

  const text = "Playing boom every 2 seconds";
  const textWidth = measureText(text, 32);

  drawText({
    text: text,
    color: Black,
    fontSize: 32,
    posX: getScreenWidth() / 2 - textWidth / 2,
    posY: getScreenHeight() / 2,
  });

  endDrawing();
}

unloadSound(boomSound);

closeAudioDevice();

closeWindow();
