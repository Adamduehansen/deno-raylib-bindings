import { Image, ResourceManager, Sound } from "@src/resource.ts";
import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  setTargetFPS,
  White,
  windowShouldClose,
} from "@src/r-core.ts";
import { closeAudioDevice, initAudioDevice } from "@src/r-audio.ts";
import { drawTexture } from "@src/r-textures.ts";

initWindow({
  title: "Examples - managing resources",
  height: 450,
  width: 800,
});

setTargetFPS(60);

initAudioDevice();

const resourceFolderPath = import.meta.dirname + "/resources";

const Resources = {
  image: new Image(resourceFolderPath + "/scarfy.png"),
  sound: new Sound(resourceFolderPath + "/boom.wav"),
} as const;

const loader = new ResourceManager(Object.values(Resources));

loader.load();

while (windowShouldClose() === false) {
  beginDrawing();

  clearBackground(White);

  drawTexture({
    color: White,
    texture: Resources.image.resource!,
    x: 0,
    y: 0,
  });

  endDrawing();
}

loader.unload();

closeAudioDevice();

closeWindow();
