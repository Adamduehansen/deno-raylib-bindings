import {
  closeAudioDevice,
  initAudioDevice,
  loadSound,
  playSound,
  unloadSound,
} from "@src/r-audio.ts";
import {
  beginDrawing,
  Black,
  clearBackground,
  closeWindow,
  endDrawing,
  getScreenHeight,
  getScreenWidth,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@src/r-core.ts";
import { drawText, measureText } from "@src/r-text.ts";
import { Timer } from "@src/timer.ts";

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
