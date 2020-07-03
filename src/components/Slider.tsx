// https://codesandbox.io/s/infinite-slideshow-nigoy?file=/src/index.js

import React, {useCallback, useRef, useMemo} from 'react'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'
import { SliderProps } from '../types'

export function Slider ({children, width=600,visible=4,style={}}:SliderProps) {
    const len = useMemo(()=>(children.length>visible)?children.length:visible,[children,visible])
    const idx = useCallback((x) => (x<0 ? x+len : x) % len, [children,len])
    const getPos = useCallback((i, firstVis, firstVisIdx) => idx(i - firstVis + firstVisIdx), [idx])
    const [springs, set] = useSprings(len, i => ({ x : (i<len-1?i:-1)*width }) )
    const prev        = useRef([0, 1])
    const wheelOffset = useRef(0)
    const dragOffset  = useRef(0)
    const runSprings = useCallback((xy, vxy)=>{
        const firstVis = idx(Math.floor(xy / width) % len)
        const firstVisIdx = (vxy<0)?len-visible:1
        set((i:any) => {
            const position     = getPos(i, firstVis       , firstVisIdx)
            const prevPosition = getPos(i, prev.current[0], prev.current[1])
            const rank = firstVis - (xy<0?len:0) + position - firstVisIdx
            const configPos = vxy > 0 ? position : len-position-1
            return {
                x: (-xy % (width*len)) + width*rank,
                immediate: vxy<0 ? prevPosition>position : prevPosition<position,
                config: { tension:(1+len-configPos)*100, friction:30+configPos*40 }
            }
        })
        prev.current = [firstVis, firstVisIdx]
    }, [idx, getPos, width, visible, set, len] )
    const bind = useGesture({
        onDrag :({offset:[x,],vxvy:[vx,]})=>vx&&( dragOffset.current=-x, runSprings(wheelOffset.current-x, -vx) ),
        onWheel:({offset:[,y],vxvy:[,vy]})=>vy&&( wheelOffset.current= y, runSprings(dragOffset.current+y,  vy) ),
    })
    //console.log('\t\tRender Slider');
    return (
        <div {...bind()} style={{position:"absolute",bottom:0,left:0,width:"100%",height:"100%"}}>
          {springs.map(({x}, i) => (
            <animated.div key={i} style={{position:'absolute',x,willChange:'transform',...style}}>
                {children[i]}
            </animated.div>
          ))}
        </div>
    )
}
