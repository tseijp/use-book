import React, { Fragment, useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
//import { Spring } from 'react-spring/renderprops'
import './styles.css'
import { unregister } from './serviceWorker'
import { Scanner, Sheet, Slider } from '../src'//'use-amazon'
import { Book, Button } from './components'

//const items1 = [...Array(9)].map((_,i)=>4041013380+i) // typescript 0~9
const items2 = [4041013380,4041002877,4041315220,4041067944,4041366054,4041245257]  //角川 true
//const items = [4041013380,4041002872,4041315224,4041067949,4041366059,4041245255]//角川 false

const App = () => {
    const [urls, setUrls] = useState<string[]>([...items2].map(v=>`amazon.com/dp/${v}`))
    const [book, setBook] = useState<string>('')
    const [books, setBooks] = useState<string[]>([...items2].map(v=>`amazon.com/dp/${v}`))
    const [opened, setOpened] = useState<boolean>(false); // sheet stil opened
    const [started, setStarted] = useState<boolean>(false); // quagga stil inited ?
    const addURL = useCallback((code:string)=>{
        console.log('Index add URL');
        if ( code.length!==10 && code.length!==13 ) return
        const newURL = code.length===10?code:code.slice(3)
        if ( urls.filter(url=>url===newURL).length ) return
        setUrls(pre=>[newURL, ...pre])
    }, [urls])
    const addBook = useCallback((url:string)=>setBooks(pre=>[url, ...pre]),[])
    const height = window.innerHeight - 60
    console.log(`Index Render ${opened?'':'no '}opened ${started?'':'no '} started`);
    return (
        <Fragment>
            <Button
                onOpen ={()=>!opened&&setOpened(true)  }//,setStarted(false))}
                onClose={()=> opened&&setOpened(false) }//,setStarted(false))}
                height ={height} limit={200} opened={opened} started={started}/>
            <Sheet
                onOpen ={()=>!opened&&(setOpened(true), setUrls([]))}
                onClose={()=> opened&&setOpened(false) }
                height ={height} started={started} >
                {opened &&
                    <Scanner
                        onStarted ={(bool:boolean)=>setStarted(bool)}
                        onDetected={(code:string)=>addURL(code)}/>
                }
                {(opened && started)&&
                    <Slider width={200} visible={5} style={{height:"25%",bottom:"25%",left:0,}}>
                    {books.map((url,i)=>
                        <Book key={i} url={url} onOpen={()=>opened&&(setOpened(false),addBook(url))}/>
                    )}
                    </Slider>
                }
            </Sheet>
            <Slider width={400} visible={5} style={{height:"50%",top:0,left:0,}}>
                {books.map((url,i)=>
                    <Book key={i} url={url} onOpen={()=>setBook(url)}/>
                )}
            </Slider>
            {/*debug*/}
            <div style={{position:"fixed",bottom:0,left:0,fontSize:"2em"}}>
                <span style={{color:"white"}}>
                    {book && <Book url={book} onOpen={()=>setBook('')}/>}
                </span>
            </div>
        </Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
unregister();
