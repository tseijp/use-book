import React, { Fragment, useCallback, useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'
import { unregister } from './serviceWorker'
import { useAmazon, Scanner, Sheet, Slider } from '../src'//'use-amazon'

type BookProps = {
    url?:string,
    onClick:any,
}

const Book = ({url='', onClick}:BookProps) => {
    const book = useAmazon(url, {})
    return (
        <div style={{width:"auto", height:"100%", padding:"50px 50px"}} onClick={onClick}>
            <img style={{width:"auto",height:"100%",pointerEvents:"none"}} {...book.img}/>
            <span style={{position:"absolute",bottom:0,left:"2em",color:"white"}}> {book.img.src} </span>
        </div>
    )
}
type ButtonProps = {
    height:number,
    limit :number,
    opened :boolean,
    started:boolean,
    onOpen :Function,
    onClose:Function,
}
const Button = ({height,limit,opened,started,onOpen,onClose}:ButtonProps) => {
    const draggingRef = useRef(false)
    const [{ scale,x,y }, set] = useSpring(() => ({ scale:1, x:0, y:0 }))
    //const start  =()=>set({y:10  , config:config.stiff })
    const open  =()=>set({scale:1.5,x:-25,y:-25, config:config.stiff })
    const start =()=>set({scale:1,x:0,y:+100, config:config.stiff })
    const close =()=>set({scale:1,x:0,y:0, config:config.stiff })
    const toggle=()=>{return (opened&&started)?(onClose(), close()):(onOpen(), open())}
    const bind = useGesture({
        onDrag: ({vxvy:[,vy],down,movement:[mx,my],cancel})=>{
            if ((mx**2+my**2 > limit**2) && cancel) cancel()
            set({ x:down?mx:0, y:down?my:0,config:config.stiff })
        },
        onClick:()=>toggle()
    })
    useEffect(()=>{started?start():close()}, [started])
    const display= y.to(py=>(py<height?'flex':'none'))
    return (
        <animated.div className="action-btn" {...bind()} style={{display,scale,x,y}}>
            +</animated.div>
    )
}

const App = () => {
    console.log('Index Render');
    const result = useRef('')//[result, setResult] = useState<string>('');
    const [urls, setUrls] = useState<string[]>([...Array(1)].fill(`amazon.com/dp/4873119049`))
    const [books, setBooks] = useState<string[]>([...Array(1)].fill(`amazon.com/dp/4873119049`))
    const [opened, setOpened] = useState<boolean>(false); // sheet stil opened
    const [started, setStarted] = useState<boolean>(false); // quagga stil inited ?
    const height = window.innerHeight - 60
    return (
        <Fragment>
            <Button onOpen ={()=>(setOpened(true) ,setStarted(false))}
                    onClose={()=>(setOpened(false),setStarted(false))}
                    height ={height} limit={200} opened={opened} started={started}/>
            <Sheet  height ={height} started={started}
                    onOpen ={()=>(!opened&&(setOpened(true), setUrls([])))}
                    onClose={()=>( opened&&(setOpened(false),setStarted(false)))}>
                {opened && !started && <p onClick={()=>setStarted(false)}>Please Wait ...</p>}
                {opened &&
                    <Scanner
                        onStarted ={(bool:boolean)=>setStarted(bool)}
                        onDetected={(r:string)=>setUrls(pre=>[r, ...pre])}/>
                }
                {/*opened && urls.length &&
                    <Slider width={300} visible={4}>
                        {(urls?urls instanceof Array?urls:[urls]:[]).map((url,i)=>
                            <Book key={i} url={url}
                            onClick={()=>(setBooks(pre=>[...pre,'amazon.com/dp/4873119049']), setOpened(false))}/>
                        )}
                    </Slider>
                */}
            </Sheet>
            {true &&
                <Slider width={300} visible={4}>
                    {(books?books instanceof Array?books:[books]:[]).map((url,i)=>
                        <Book key={i} url={url} onClick={()=>console.log(url)}/>
                    )}
                </Slider>
            }
            {/*debug*/}
            <div style={{position:"fixed",top:0,left:0,fontSize:"2em"}}>
                <span style={{color:"white"}}>
                    <p>{`${opened?'':'no'} opened`}</p>
                    <p>{`${started?'':'no'} started`}</p>
                </span>
            </div>
        </Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
unregister();
