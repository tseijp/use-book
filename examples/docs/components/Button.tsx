import React, { useEffect, useCallback as _ } from "react";
import { useSpring, animated, } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled from "styled-components";

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
type Fun = (...args: any) => void

type ButtonProps = {
  height:number,
  limit :number,
  opened: boolean,
  started: boolean,
  onStart?: Fun,
  onFinish?: Fun,
}

export function Button (props:ButtonProps) {
  const { height, limit, opened, started, onStart, onFinish } = props;
  const [{ scale,x,y }, api] = useSpring(() => ({ scale:1, x:0, y:0 }));
  const open  = _(() => api.start({scale:1.2, x:-25, y:-25 }), [api]);
  const start = _(() => api.start({scale:1  , x:0  , y:+100}), [api]);
  const close = _(() => api.start({scale:1  , x:0  , y:0   }), [api]);
  const onClick = () => opened && started? (onFinish?.(), close()): (onStart?.(), open());
  const bind = useGesture({onClick, onDrag: (state) => {
      const {down, movement: [mx,my], cancel} = state;
      if ((mx**2+my**2 > limit**2) && cancel) cancel();
      api.start({ x:down?mx:0, y:down?my:0 });
    }
  });
  const display = y.to(py => (py<height?true:false))? 'flex': 'none';

  useEffect(() => void (started? start(): close()), [started, start, close]);
  return <Div {...bind()} style={{display, scale, x, y}}>+</Div>;
}
