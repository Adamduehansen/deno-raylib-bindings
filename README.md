# Raylib Bindings

Bindings for Raylib. The bindings are separated into modules according to the
[cheatsheet](https://www.raylib.com/cheatsheet/cheatsheet.html).

The bindings assume that a binaries for Raylib are located at
{project-root}/lib/{binray-file}.

Example: Draw "Hello, World"

```ts
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
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawText, measureText } from "@adamduehansen/raylib-bindings/r-text";

initWindow({
  title: "test",
  height: 450,
  width: 800,
});

while (windowShouldClose() === false) {
  beginDrawing();

  clearBackground(RayWhite);

  const textWidth = measureText("Hello, World!", 32);

  drawText({
    text: "Hello, World!",
    color: Black,
    fontSize: 32,
    posX: getScreenWidth() / 2 - textWidth / 2,
    posY: getScreenHeight() / 2,
  });

  endDrawing();
}

closeWindow();
```

Binding are in early stages of development and may change...
