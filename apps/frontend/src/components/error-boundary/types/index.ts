import { ForwardRefExoticComponent } from 'react'

export type ComponentPropsWithoutChildren<Component> = Component extends ForwardRefExoticComponent<infer Props>
  ? Omit<Props, 'children'>
  : Component extends keyof JSX.IntrinsicElements
  ? Omit<JSX.IntrinsicElements[Component], 'children'>
  : never
