import {
  closeAudioDevice,
  initAudioDevice,
  loadMusicStream,
  playMusicStream,
  unloadMusicStream,
  updateMusicStream,
} from "@src/r-audio.ts";
import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@src/r-core.ts";

initWindow({
  title: "raylib [audio] example - music stream",
  width: 800,
  height: 450,
});

initAudioDevice();

const music = loadMusicStream("examples/resources/country.mp3");

playMusicStream(music);

setTargetFPS(30);

while (windowShouldClose() === false) {
  updateMusicStream(music);

  beginDrawing();
  clearBackground(RayWhite);
  endDrawing();
}

unloadMusicStream(music);

closeAudioDevice();

closeWindow();
