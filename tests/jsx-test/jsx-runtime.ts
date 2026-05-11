import { RaylibColor } from "@adamduehansen/raylib-bindings/r-core";

/** The jsx function to create elements */
export function jsx<T extends keyof JSX.IntrinsicElements>(
  type: T,
  props: JSX.IntrinsicElements[T],
): JSX.Element;
export function jsx<P extends object>(
  type: Function,
  props: P,
): JSX.Element;
export function jsx(
  type: string | Function,
  props: object,
): JSX.Element {
  const element = Object.create(null);
  element.type = type;
  element.props = props;
  return element;
}

export function Fragment(props: { children: JSX.Element | JSX.Element[] }) {
  return props.children;
}

export async function renderComponent(
  component: JSX.Element | JSX.Element[],
): Promise<string> {
  return "";
}

declare global {
  export namespace JSX {
    export type IntrinsicElements = {
      transform: {
        x: number;
        y: number;
        children: JSX.Element | JSX.Element[];
      };
      rectangle: { width: number; height: number; color: RaylibColor };
    };

    export type ElementType = keyof IntrinsicElements | Function;

    // Create a discriminated union for better type narrowing
    export type Element =
      | { type: "transform"; props: IntrinsicElements["transform"] }
      | { type: "rectangle"; props: IntrinsicElements["rectangle"] }
      | { type: Function; props: object };
  }
}
