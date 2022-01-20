// https://codesandbox.io/s/infinite-slideshow-nigoy?file=/src/index.js
import React, { useRef, useCallback as _ } from "react";
import { useGesture } from "react-use-gesture";
import { useSprings, animated } from "react-spring";
import styled from "styled-components";

export type SliderProps = Partial<{
  style: any
  width: number,
  visible: number,
  children: any,
}>

export function Slider (props: SliderProps) {
  const {children, width=600, visible=4, style={}} = props;
  const len = children.length > visible? children.length: visible;
  const getIdx = _((x) => (x<0 ? x + len : x) % len, [len]);
  const getPos = _((i, j, k) => getIdx(i - j + k), [getIdx]);
  const [$, set] = useSprings(len, i => ({ x : (i<len-1?i:-1)*width }));
  const $d = useRef(0);
  const $w = useRef(0);
  const $p = useRef([0, 1]);
  const run = _((xy, vxy) => {
    const j = getIdx(Math.floor(xy / width) % len);
    const k = (vxy < 0)? len - visible: 1;
    set((i=0) => {
      const pos = getPos(i, j, k);
      const pre = getPos(i, $p.current[0], $p.current[1]);
      const x = (-xy % (width*len)) + width*( j - (xy < 0? len: 0) + pos - k );
      const immediate = vxy < 0 ? pre > pos : pre < pos;
      return { x, immediate };
    });
    $p.current = [j, k];
  }, [getIdx, getPos, width, visible, set, len]);

  const bind = useGesture({
    onDrag: ({offset: [x,], vxvy: [vx,]}) => vx && ($d.current=-x, run($w.current-x, -vx)),
    onWheel: ({offset: [,y], vxvy: [,vy]}) => vy && ($w.current=y, run($d.current+y, vy)),
  });

  return (
    <Wrap {...bind()}>
      {$.map(({x}, i) => (
        <Item key={i} style={{x, ...style}}>
          {children[i]}
        </Item>
      ))}
    </Wrap>
  );
}


const Wrap = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`

const Item = styled(animated.div)`
  position: absolute;
  will-change: transform;
`
