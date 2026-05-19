import { assertSpyCalls, spy } from "@std/testing/mock";
import { Events } from "./event.ts";

Deno.test("should trigger event when emitted", () => {
  // Arrange
  const events = new Events();
  const handlerMock1 = spy();
  const handlerMock2 = spy();

  // Act
  events.on("test", handlerMock1);
  events.on("test", handlerMock2);
  events.emit("test");

  // Assert
  assertSpyCalls(handlerMock1, 1);
  assertSpyCalls(handlerMock2, 1);
});
