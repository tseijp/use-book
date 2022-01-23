import React, { useState, useEffect, createElement as el } from "react";
import { Controller, Props, State } from "./Controller";

type Ref = React.ForwardedRef<any>

export function useBook (props: Props, ref?: any): State

export function useBook (props: Props, ref?: any) {
  const [ctrl] = useState(new Controller());
  const render = useState([])[1];
  useEffect(() => ctrl.effect());
  return ctrl.apply(render, props, ref);
}

export const UseBook = React.forwardRef(_UseBook)

function _UseBook (props: Props & {
  children: (state: State) => null | JSX.Element
}, ref: Ref): null | JSX.Element;

function _UseBook (props: Props & {
  chldren: null | JSX.Element
  as: string
    | keyof React.ReactHTML
    | keyof React.ReactSVG
    | React.FunctionComponent<any>
    | React.ClassType<any, any, any>
    | React.ComponentClass<any>
}, ref: Ref): null | JSX.Element

function _UseBook (props: any, ref: any) {
  const { children, as, ...other } = props
  const state = useBook(other, ref);
  return as? el(as, state, children): children(state)
}
