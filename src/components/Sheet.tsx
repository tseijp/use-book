import React, { useEffect, useRef } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './Sheet.css'

type SheetProps = {
    height : number
    started ?:boolean,
    onOpen ?:Function|null,
    onClose?:Function|null,
    children?:any,
}

export function Sheet ({children, height, started=false, onOpen=null,onClose=null}:SheetProps) {
    const draggingRef = useRef(false)
    const [{ y }, set] = useSpring(() => ({ y:height }))
    const open =(canceled=false)=> (onOpen&&onOpen() ,set({ y:0    , config:canceled ? config.wobbly : config.stiff }) )
    const close   =(velocity=0)=> (onClose&&onClose(),set({ y:height, config:{...config.stiff, velocity} }) )
    const bind = useDrag(
    ({ first, last, vxvy:[,vy],movement:[mx,my], cancel }) => {
        if     (first) draggingRef.current = true
        else if (last) setTimeout(() => (draggingRef.current = false), 0)
        if (my<-100 && cancel) cancel()
        if (last) return ( (my>height*0.5||vy>2.5) && (-100<mx&&mx<100) )? close(vy):open(vy>0)
        set({ y: my, immediate: false, config: config.stiff })
    },
    { initial:()=>[0,y.get()], filterTaps:true, bounds:{top:0}, rubberband:true }
    )
    const display = y.to(py => (py < height ? 'block' : 'none'))
    useEffect(()=>{ started ? open() : close() }, [started])
    return (
        <animated.div className="sheet" {...bind()} style={{ display, bottom:`calc(-100vh + ${height-100}px)`, y }}>
            {children}
        </animated.div>
    )
}
