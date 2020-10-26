import React, { useMemo, useRef } from 'react'
import { useGesture } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'
import { useBook } from '../../src'

type BookProps = {
    onOpen?:any,
    style?:any,
    url  ?:string,
    limit?:number,
}

export function Book ({url='', limit=400, style={}, onOpen}:BookProps) {
    const book = useBook(url)
    const cantopen = useRef(false)
    const [{scale,x,y}, set] = useSpring(()=>({ scale:1, x:0, y:0 }))
    const bind = useGesture({
        onHover:(e)=>set({scale:e.hovering?1.1:1}),
        onClick:(e)=>1&&(onOpen(), e.stopPropagation()),
        onDrag :({down,vxvy:[vx,],movement:[mx,my],cancel})=>{
            if ((mx**2+my**2 > limit**2) && cancel) cancel()
            const notOpen = 100<Math.floor(mx)||2<Math.floor(vx)||down||cantopen.current
            set({ x:down?mx:0, y:down?my:0, scale:(notOpen&&Math.floor(my)<limit/2)?1.2:0.8 })
            //console.log(100<Math.floor(mx),2<Math.floor(vx),down,cantopen.current);
            if (notOpen) return null
            cantopen.current = true
            onOpen()
        },
    })
    const styles = useMemo(()=>({
        div:{width:"auto",height:"100%",scale,x,y, zIndex:1, ...style} as React.CSSProperties,
        img:{width:"auto",height:"100%",borderRadius:"1em",pointerEvents:"none", } as React.CSSProperties,
        //span:{position:"absolute",bottom:"1em",left:"3em",color:"white"} as React.CSSProperties,
    }),[style,scale,x,y])
    //console.log('\t\tRender Book', book.img);
    return (
        <animated.div style={styles.div} {...bind()}>
            {book.img && <img alt="book" style={styles.img} {...book.img}/>}
        </animated.div>
    )
}
