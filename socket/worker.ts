/// <reference lib="webworker" />

const socket = new WebSocket("ws://localhost:8000/ws");

self.addEventListener("message", (event: MessageEvent) => {
  console.log(socket.readyState === socket.OPEN);
});
