import React, { useEffect, useCallback as _, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const Div = styled(animated.div)<any>`
  left: 2vw;
  width: 96vw;
  height: calc(100vh + 100px);
  bottom: ${({$h}) => `calc(-100vh + ${$h - 100}px)`};
  zIndex: 100;
  position: fixed;
  touchAction: none;
  border-radius: 4em 4em 0px;
  background-color: rgba(0,0,0,0);
`

type Fun = (...args: any) => void

export type SheetProps = Partial<{
  height: number
  onStart: Fun
  onFinish: Fun
  started: boolean
  children:any
}>

export function Sheet (props:SheetProps) {
  const { height: h=100, started=false, onStart, onFinish, ...other } = props;
  const [{ y }, api] = useSpring(() => ({ y: h }));

  const open = () => void (onStart?.(), api.start({y: 0}));
  const close = () => void (onFinish?.(), api.start({y: h}));
  const fun = useRef((_started=true) => _started? open(): close());
  useEffect(() => fun.current(started), [started]);

  const bind = useDrag((state) => {
    const { last, vxvy: [,vy], movement: [mx, my], cancel } = state;
    if (my < -h/3) cancel?.();
    if (last) (my > h*0.5 || vy > 2.5) && (-100 < mx && mx < 100)? close(): open();
    else api.start({ y: my, immediate: false });
  }, { initial:()=>[0,y.get()], filterTaps:true, bounds: {top:0}, rubberband:true });

  const display = y.to(py => (py < h? 'block': 'none'));

  return <Div $h={h} {...bind()} style={{y, display}} {...other}/>;
}
