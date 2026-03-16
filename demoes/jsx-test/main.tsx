import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";

function Player({ x, y }: { x: number; y: number }) {
  return (
    <transform x={x} y={y}>
      <rectangle width={50} height={50} />
    </transform>
  );
}

initWindow({
  "title": "JSX test",
  height: 450,
  width: 450,
});

setTargetFPS(60);

function render(element: JSX.Element): void {
  if (typeof element.type === "function") {
    return render(element.type(element.props));
  }

  // console.log(element);
}

while (windowShouldClose() === false) {
  beginDrawing();

  clearBackground(RayWhite);
  render(<Player x={100} y={200} />);

  drawFPS(0, 0);

  endDrawing();
}

closeWindow();
