/** The jsx function to create elements */
export function jsx(
  type: string,
  props: unknown,
): unknown {
  const element = Object.create(null);
  element.type = type;
  element.props = props;
  return element;
}

export function Fragment(props: { children: unknown }) {
  return props.children;
}

export async function renderComponent(
  component: unknown | unknown[],
): Promise<string> {
  return "";
}

declare global {
  export namespace JSX {
    export type IntrinsicElements = {
      transform: { x: number; y: number; children: unknown };
      rectangle: { width: number; height: number };
    };
    export type Element = { type: Function | string; props: unknown };
  }
}
