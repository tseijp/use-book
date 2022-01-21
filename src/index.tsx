import { useState, useEffect } from "react";
import { Controller, Props, State } from "./Controller";

export function useBook (props: Props): State

export function useBook (props: Props) {
    const [ctrl] = useState(new Controller())
    useEffect(() => ctrl.effect())
    return ctrl.apply(props)
}

export function Book (props: Props & {
  children: (props:any) => JSX.Element,
}): JSX.Element;

export function Book ({children, ...props}: any) {
  return children(useBook(props) as any);
}
