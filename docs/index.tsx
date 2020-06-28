import React, { Fragment, useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
//import { Spring } from 'react-spring/renderprops'
import './styles.css'
import { unregister } from './serviceWorker'
import { Scanner, Sheet, Slider } from '../src'//'use-amazon'
import { Book, Button } from './components'

//const items = [...Array(9)].map((_,i)=>4041013380+i)
const items = [4041013380,4041002877,4041315220,4041067944,4041366054,4041245257]
//const items = [4041013380,4041002872,4041315224,4041067949,4041366059,4041245255]

const App = () => {
    console.log('Index Render');
    const [urls, setUrls] = useState<string[]>([...Array(0)].fill(`amazon.com/dp/4873119049`))
    const [book, setBook] = useState<string>('')
    const [books, /*setBooks*/] = useState<string[]>([...items].map(v=>`amazon.com/dp/${v}`))
    const [opened, setOpened] = useState<boolean>(false); // sheet stil opened
    const [started, setStarted] = useState<boolean>(false); // quagga stil inited ?
    const addURL = useCallback((code:string)=>{
        if ( code.length!==10 && code.length!==13 ) return
        const newURL = code.length===10?code:code.slice(3)
        if ( urls.filter(url=>url===newURL).length ) return
        setUrls(pre=>[newURL, ...pre])
        console.log(urls)
    }, [urls])
    const height = window.innerHeight - 60
    return (
        <Fragment>
            <Button onOpen ={()=>{setOpened(true) ; setStarted(false)}}
                    onClose={()=>{setOpened(false); setStarted(false)}}
                    height ={height} limit={200} opened={opened} started={started}/>
            <Sheet  height ={height} started={started}
                    onOpen ={()=>(!opened&&(setOpened(true), setUrls([])))}
                    onClose={()=>( opened&&(setOpened(false),setStarted(false)))}>
                {opened && !started && <p onClick={()=>setStarted(false)}>Please Wait ...</p>}
                {opened &&
                    <Scanner
                        onStarted ={(bool:boolean)=>setStarted(bool)}
                        onDetected={(code:string)=>addURL(code)}/>
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
            <Slider width={350} visible={5} style={{height:"50%",bottom:0,left:0,}}>
                {(books?books instanceof Array?books:[books]:[]).map((url,i)=>
                    <Book key={i} url={url} onOpen={()=>setBook(url)}/>
                )}
            </Slider>
            {/*debug*/}
            <div style={{position:"fixed",top:0,left:0,fontSize:"2em"}}>
                <span style={{color:"white"}}>
                    <p>{book || 'please Drag Book'}</p>
                    {book && <Book url={book} onOpen={()=>setBook('')}/>}
                </span>
            </div>
        </Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
unregister();
