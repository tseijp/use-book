import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled from "styled-components";
import { useBook } from "use-book/src";

const Div = styled(animated.div)`
  width: auto;
  height: 100%;
  z-index: 1;
`

const Img = styled.img`
  width: auto;
  hheight: 100%;
  border-radius: 1rem;
  pointer-events: none;
`

type BookProps = {
  onStart?: any
  style?: any
  limit?: number
  src: string
}

export function Book (props: BookProps) {
  const { limit=400, style={}, onStart, ...other } = props
  const { src, alt } = useBook(other);
  const cantOpen = useRef(false);
  const [spring, api] = useSpring(() => ({ scale:1, x:0, y:0 }));
  const bind = useGesture({
    onHover: e => api.start({scale: e.hovering? 1.1: 1}),
    onClick: e => { onStart?.(); e.stopPropagation() },
    onDrag: state => {
      const { down, vxvy: [vx,], movement: [mx,my], cancel } = state;
      if ((mx**2 + my**2 > limit**2) && cancel) cancel();
      const notOpen = 100 < Math.floor(mx)
        || 2 < Math.floor(vx)
        || down
        || cantOpen.current;
      const scale = (notOpen && Math.floor(my) < limit/2)? 1.2: 0.8;
      api.start({ x: down? mx: 0, y: down? my: 0, scale });
      if (notOpen) return null;
      cantOpen.current = true;
      onStart?.();
    },
  })

  return (
    <Div style={{...spring, ...style}} {...bind()}>
      <Img src={src} alt={alt}/>
    </Div>
  );
}
