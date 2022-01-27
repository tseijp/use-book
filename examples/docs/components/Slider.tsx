// https://codesandbox.io/s/infinite-slideshow-nigoy?file=/src/index.js
import React, { useRef, useCallback as _ } from "react";
import { useGesture } from "react-use-gesture";
import { useSprings, animated } from "react-spring";
import styled from "styled-components";

const Wrap = styled.div<any>`
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 50vh;
  position: relative;
  ${({$top}) => $top && `
    position: absolute;
    height: calc(100vh - 60px);
    top: 60px;
    left: 0;
  `}
`

const Item = styled(animated.div)`
  position: absolute;
  will-change: transform;
`

export type SliderProps = Partial<{
  $top: boolean
  style: any
  width: number
  visible: number
  children: React.ReactNode[]
}>

export function Slider (props: SliderProps) {
  const { children, width=600, visible=4, ...other } = props;
  const $d = useRef(0);
  const $w = useRef(0);
  const $p = useRef([0, 1]);
  const len = (children?.length! > visible? children?.length: visible) || 0;
  const [$, api] = useSprings(len, i => ({ x : (i<len-1?i:-1)*width }));

  const getIdx = (x=0) => (x<0 ? x + len : x) % len;
  const getPos = (i=0, j=0, k=0) => getIdx(i - j + k)
  const fun = (xy=0, vxy=0) => {
    const j = getIdx(Math.floor(xy / width) % len);
    const k = (vxy < 0)? len - visible: 1;
    api.start((i=0) => {
      const pos = getPos(i, j, k);
      const pre = getPos(i, $p.current[0], $p.current[1]);
      const x = (-xy % (width*len)) + width*( j - (xy < 0? len: 0) + pos - k );
      const immediate = vxy < 0 ? pre > pos : pre < pos;
      return { x, immediate };
    });
    $p.current = [j, k];
  }

  const bind = useGesture({
    onDrag: ({offset: [x,], vxvy: [vx,]}) => vx && ($d.current=-x, fun($w.current-x, -vx)),
    onWheel: ({offset: [,y], vxvy: [,vy]}) => vy && ($w.current=y, fun($d.current+y, vy)),
  });

  return (
    <Wrap {...bind()} {...other}>
      {$.map(({x}, i) => (
        <Item key={i} style={{x}}>
          {children?.[i]}
        </Item>
      ))}
    </Wrap>
  );
}
