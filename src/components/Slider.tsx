// https://codesandbox.io/s/infinite-slideshow-nigoy?file=/src/index.js

import React, {useCallback, useRef} from 'react'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'

type SliderProps = {
    width   ?:number,
    visible ?:number,
    children?:any,
    style   ?:any
}

export function Slider ({children, width=600,visible=4,style={}}:SliderProps) {
    const idx = useCallback((x,l=children.length) => (x<0 ? x+l : x) % l, [children])
    const getPos = useCallback((i, firstVis, firstVisIdx) => idx(i - firstVis + firstVisIdx), [idx])
    const [springs, set] = useSprings(children.length, i => ({ x : (i<children.length-1?i:-1)*width }) )
    const prev        = useRef([0, 1])
    const wheelOffset = useRef(0)
    const dragOffset  = useRef(0)
    const runSprings = useCallback((xy, vxy)=>{
        const firstVis = idx(Math.floor(xy / width) % children.length)
        const firstVisIdx = vxy < 0 ? children.length - visible - 1 : 1
        set((i:{}) => {
            const position     = getPos(i, firstVis       , firstVisIdx)
            const prevPosition = getPos(i, prev.current[0], prev.current[1])
            const rank = firstVis - (xy<0?children.length:0) + position - firstVisIdx
            const configPos = vxy > 0 ? position : children.length - position
            return {
                x: (-xy % (width * children.length)) + width * rank,
                immediate: vxy < 0 ? prevPosition > position : prevPosition < position,
                config: { tension: (1 + children.length - configPos) * 100, friction: 30 + configPos * 40 }
            }
        })
        prev.current = [firstVis, firstVisIdx]
    }, [idx, getPos, width, visible, set, children.length] )
    const bind = useGesture({
        onDrag :({offset:[x,],vxvy:[vx,]})=>{if(vx){dragOffset.current=-x;runSprings(wheelOffset.current-x, -vx)}},
        onWheel:({offset:[,y],vxvy:[,vy]})=>{if(vy){dragOffset.current= y;runSprings(wheelOffset.current+y,  vy)}},
    })
    //return null
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
