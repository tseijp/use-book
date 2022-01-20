import React, { useEffect, useCallback as _ } from "react";
import { useSpring, animated, } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled from "styled-components";

type ButtonProps = {
  height:number,
  limit :number,
  opened :boolean,
  started:boolean,
  onOpen :Function,
  onClose:Function,
}

export function Button (props:ButtonProps) {
  const { height, limit, opened, started, onOpen, onClose } = props;
  const [{ scale,x,y }, set] = useSpring(() => ({ scale:1, x:0, y:0 }));
  const open  = _(() => set({scale:1.2,x:-25,y:-25 }), [set]);
  const start = _(() => set({scale:1  ,x:0  ,y:+100}), [set]);
  const close = _(() => set({scale:1  ,x:0  ,y:0   }), [set]);
  const onClick = () => opened && started? (onClose(), close()): (onOpen(), open());
  const bind = useGesture({onClick, onDrag: (state) => {
      const {down, movement: [mx,my], cancel} = state;
      if ((mx**2+my**2 > limit**2) && cancel) cancel();
      set({ x:down?mx:0, y:down?my:0 });
    }
  });
  const display = y.to(py => (py<height?true:false))? 'flex': 'none';

  useEffect(() => void (started? start(): close()), [started, start, close]);
  return <Div {...bind()} style={{display, scale, x, y}}>+</Div>;
}

const Div = styled(animated.div)`
  font-size: 2em;
  bottom: 1em;
  right: 1em;
  height: 2em;
  width: 2em;
  border-radius: 4em;
  z-index:99;
  position: fixed;
  background: coral;
  align-items: center;
  justify-content: center;

`
