import { type RaylibTexture } from "@adamduehansen/raylib-bindings/r-core";
import { Sprite } from "./sprite.ts";
import { assertEquals } from "@std/assert/equals";

const testTexture: RaylibTexture = {
  id: 0,
  height: 16,
  width: 16,
  mipmaps: 0,
  format: 0,
};

Deno.test("Should use x, y, width and height from options", () => {
  // Arrange
  const spriteOptions: ConstructorParameters<typeof Sprite>[1] = {
    height: 8,
    width: 6,
    x: 4,
    y: 2,
  };
  const sprite = new Sprite(testTexture, spriteOptions);

  // Act
  const { x, y, width, height } = sprite;

  // Assert
  assertEquals(x, 4);
  assertEquals(y, 2);
  assertEquals(width, 6);
  assertEquals(height, 8);
});

Deno.test("Should use fallback values and texture if no options are given", () => {
  // Arrange
  const sprite = new Sprite(testTexture);

  // Act
  const { x, y, width, height } = sprite;

  // Assert
  assertEquals(x, 0);
  assertEquals(y, 0);
  assertEquals(width, 16);
  assertEquals(height, 16);
});
