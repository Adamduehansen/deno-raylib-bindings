import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  Red,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawRectangleV } from "@adamduehansen/raylib-bindings/r-shapes";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";

function useState<T>(value: T): [T, (value: T) => void] {
  function updateValue(): T {
    return value;
  }

  return [value, updateValue];
}

function useUpdate(handler: () => void): void {
}

function Player() {
  const [width, setWidth] = useState(50);
  useUpdate(() => {
    setWidth(width + 1);
  });

  return <rectangle width={width} height={50} color={Red} />;
}

initWindow({
  "title": "JSX test",
  height: 450,
  width: 450,
});

setTargetFPS(60);

function render(element: JSX.Element): void {
  console.log(element);

  if (typeof element.type === "function") {
    return render(element.type(element.props));
  }

  if (element.type === "rectangle") {
    drawRectangleV({
      color: element.props.color,
      position: { x: 0, y: 0 },
      size: {
        x: element.props.width,
        y: element.props.height,
      },
    });
  }
}

while (windowShouldClose() === false) {
  beginDrawing();

  clearBackground(RayWhite);
  render(<Player x={100} y={200} />);

  drawFPS(0, 0);

  endDrawing();
}

closeWindow();
