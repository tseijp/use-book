import React, {useEffect, useCallback} from 'react'
//import { Spring } from 'react-spring/renderprops'
import { useSpring, animated, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'

type ButtonProps = {
    height:number,
    limit :number,
    opened :boolean,
    started:boolean,
    onOpen :Function,
    onClose:Function,
}

export function Button ({height,limit,opened,started,onOpen,onClose}:ButtonProps) {
    const [{ scale,x,y }, set] = useSpring(() => ({ scale:1, x:0, y:0 }))
    //const start  =()=>set({y:10  , config:config.stiff })
    const open =useCallback(()=>set({scale:1.5,x:-25,y:-25 , config:config.stiff })  ,[set])
    const start=useCallback(()=>set({scale:1  ,x:0  ,y:+100, config:config.molasses}),[set])
    const close=useCallback(()=>set({scale:1  ,x:0  ,y:0   , config:config.stiff })  ,[set])
    const toggle=()=>{return (opened&&started)?(onClose(), close()):(onOpen(), open())}
    const bind = useGesture({
        onClick: ()=>toggle(),
        onDrag : ({down,movement:[mx,my],cancel})=>{
            if ((mx**2+my**2 > limit**2) && cancel) cancel()
            set({ x:down?mx:0, y:down?my:0,config:config.stiff })
        }
    })
    useEffect(()=>{started?start():close()}, [started, start, close])
    const display= y.to(py=>(py<height?'flex':'none'))
    return (
        <animated.div className="action-btn" {...bind()} style={{display,scale,x,y}}>
            +</animated.div>
    )
}
