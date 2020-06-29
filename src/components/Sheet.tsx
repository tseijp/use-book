import React, { useEffect, useCallback, useRef, useMemo } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './Sheet.css'

type SheetProps = {
    height  ?:number
    started ?:boolean,
    onOpen  ?:Function|null,
    onClose ?:Function|null,
    children?:any,
}

export function Sheet ({children, height=100, started=false, onOpen=null,onClose=null}:SheetProps) {
    const [{ y }, set] = useSpring(() => ({ y:height }))
    const open=useCallback((canceled=false)=> onOpen&&(onOpen() ,set({ y:0     , config:canceled?config.wobbly:config.stiff }) ),[onOpen, set])
    const close  =useCallback((velocity=0)=> onClose&&(onClose(),set({ y:height, config:{...config.stiff, velocity} }) ),[height, onClose, set])
    const bind = useDrag(
        ({ last, vxvy:[,vy],movement:[mx,my], cancel }) => {
            if (my<-height/3) cancel&&cancel()
            if (last) return ( (my>height*0.5||vy>2.5) && (-100<mx&&mx<100) )? close(vy):open(vy>0)
            set({ y:my, immediate: false, config: config.stiff })
        }, { initial:()=>[0,y.get()], filterTaps:true, bounds:{top:0}, rubberband:true }
    )
    const f = useRef((bool:boolean)=>( bool? open() : close() ))
    useEffect(()=>{ f.current(started) }, [started])
    const style = useMemo(()=>{
        const display = y.to(py => (py < height ? 'block' : 'none'))
        const backgroundColor = 'rgba(0,0,0,0)'
        return {display, backgroundColor, bottom:`calc(-100vh + ${height-100}px)`, y}
    },[height, y])
    //console.log('\tRender Sheet');
    return (
        <animated.div className="sheet" {...bind()} style={style}>
            {children}
        </animated.div>
    )
}
