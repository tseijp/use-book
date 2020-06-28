import React, { useState, useMemo } from 'react'
//import { Spring } from 'react-spring/renderprops'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { useAmazon } from '../../src'//'use-amazon'

type BookProps = {
    onOpen?:any,
    style?:any,
    url?:string,
    limit?:number,
}

export function Book ({url='', limit=400, style={}, onOpen}:BookProps) {
    const book = useAmazon(url, {})
    const [error, setError] = useState<boolean>(false)
    const [{scale,x,y}, set] = useSpring(()=>({ scale:1, x:0, y:0 }))
    const bind = useGesture({onHover:(e)=>set({scale:e.hovering?1.1:1}),
        onDrag : ({down,vxvy:[,vy],movement:[mx,my],cancel})=>{
            if ((mx**2+my**2 > limit**2) && cancel) cancel()
            set({ x:down?mx:0, y:down?my:0, scale:(-limit/2<my&&my<limit/2)?1.2:0.8 })
            if ((-limit/2<my&&my<limit/2)||mx<-100||100<mx||down) return
            if (onOpen)
                onOpen()
        },
    })
    const styles = useMemo(()=>({
        div:{width:"auto", height:"100%", padding:"50px 50px",scale,x,y, zIndex:1, ...style} as React.CSSProperties,
        img:{width:"auto", height:"100%", pointerEvents:"none"} as React.CSSProperties,
        span:{position:"absolute",bottom:0,left:"2em",color:"white"} as React.CSSProperties,
    }),[style,scale,x,y])
    if (error)
        return null
    return (
        <animated.div style={styles.div} {...bind()}>
            <img style={styles.img} {...book.img} onError={()=>setError(true)}/>
            <span style={styles.span}> {book.data.isbn} </span>
        </animated.div>
    )
}
