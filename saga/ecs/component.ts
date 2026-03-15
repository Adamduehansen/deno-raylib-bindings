export interface Component {}

export type ComponentCtor<TComponent extends Component = Component> = new (
  ...args: any[]
) => TComponent;
