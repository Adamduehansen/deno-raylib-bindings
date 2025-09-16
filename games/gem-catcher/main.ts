import {
  beginDrawing,
  closeWindow,
  drawTexture,
  endDrawing,
  initWindow,
  loadTexture,
  setTargetFPS,
  White,
  windowShouldClose,
} from "../../raylib-bindings.ts";

initWindow({
  title: "Gem Catcher",
  width: 1152,
  height: 648,
});

const bg = loadTexture("./games/gem-catcher/assets/GameBg.png");
console.log(bg.id, bg.width, bg.height, bg.mipmaps, bg.format);

setTargetFPS(60);

while (windowShouldClose() === false) {
  beginDrawing();
  drawTexture({
    texture: bg,
    x: -100,
    y: -100,
    color: White,
  });
  endDrawing();
}

closeWindow();
