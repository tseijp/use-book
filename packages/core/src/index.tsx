import React, { ForwardedRef as Ref, createElement as el } from "react";
import { Controller, Props, State, Any } from "./Controller";
export * from "./Controller";

export function useBook (props: Props, ref?: Ref<unknown>) {
  const [ctrl] = React.useState(new Controller());
  const render = React.useState([])[1];
  React.useEffect(() => ctrl.effect());
  return ctrl.apply(render, props, ref);
}

type UseBookProps = Props & {
  children: null | JSX.Element | ((state: State) => null | JSX.Element)
  as?: string
    | keyof React.ReactHTML
    | keyof React.ReactSVG
    | React.FunctionComponent<Any>
    | React.ClassType<Any, any, any>
    | React.ComponentClass<Any>
}

export const UseBook = React.forwardRef(
  function _UseBook (props: UseBookProps, ref: Ref<unknown>) {
    const { children: _, as, ...other } = props;
    const state = useBook(other, ref);
    return typeof _ === "function"? _(state): el(as, state, _);
  }
)
