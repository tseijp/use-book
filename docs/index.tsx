import React, { useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { Book, Button, Scanner, Sheet, Slider, Style } from "./components";
import styled from "styled-components";

//const items = [4041013379,4041013381]//[...Array(3)].map((_,i)=>4041013378+i); // typescript 0~9
//const items = [4041013380,4041002872,4041315224,4041067949,4041366059,4041245255];//角川 false
const items = [4041013380,4041002877,4041315220,4041067944,4041366054,4041245257];  //角川 true

function App (props: any) {
    const { debug=false } = props;
  const [urls, setUrls] = useState<string[]>([]); //([items[0]].map(v=>`amazon.com/dp/${v}/`));// DEV
  const [book, setBook] = useState<string>('');
  const [books, setBooks] = useState<string[]>([...items].map(v=>`amazon.com/dp/${v}/`)); //(() => [])//DEV
  const [opened, setOpened] = useState<boolean>(false); // sheet stil opened
  const [started, setStarted] = useState<boolean>(false); // quagga stil inited ?

  const nowDetecting = useRef<string|null>(null);
  const addURL = useCallback((code: string) => {
    if (nowDetecting.current !== null) return;
    if (code.length!==10 && code.length!==13) return;
    const newcode = code.length===10?code:code.slice(3);
    if (urls.filter(url=>url.match(newcode)).length) return;
    nowDetecting.current = newcode;
    setTimeout(() => (nowDetecting.current = null), 2000);
    setUrls(pre => [...pre, `amazon.com/dp/${newcode}`]);
  }, [urls]);

  const addBook = useCallback((url:string) => {
    setOpened(false);
    setTimeout(() => void (setBook(url), setBooks(pre=>[...pre,url])), 1);
  },[]);

  if (debug)
    console.warn(`Index Render ${opened?'':'no '}opened ${started?'':'no '}started`);

  return (
    <React.Fragment>
      <Style />
      <Button
        onOpen ={() =>!opened && setOpened(true)}
        onClose={() =>  opened && setOpened(false)}
        height ={window.innerHeight*0.96} limit={200} opened={opened} started={started}
      />
      <Sheet
        height={window.innerHeight*0.96}
        started={started}
        onOpen={() =>!opened && (setOpened(true), setBook(''), setUrls([]))} // DEV
        onClose={() => opened && setOpened(false) }
      >
        {opened &&
          <Scanner onStarted={(bool:boolean) => setStarted(bool)} onDetected={addURL}/>
        }
        {opened && started &&
          <Slider width={window.innerWidth/4} visible={6} style={{height:"40%",bottom:"15%",left:0,}}>
            {urls.map((url,i)=>
              <Book key={i} url={url} onOpen={()=>addBook(url)}/>
            )}
          </Slider>
        }
      </Sheet>
      <Slider width={window.innerWidth/3} visible={5} style={{height:"50%",top:0,left:0,}}>
        {books.map((url,i)=>
          <Book key={i} url={url} onOpen={()=>setBook(url)}/>
        )}
      </Slider>
      <Wrap>
        <Span>
          {book &&
            <Book url={book} onOpen={()=>setBook('')}/>
          }
        </Span>
      </Wrap>
    </React.Fragment>
  )
}

const Wrap = styled.div`
    left: 0;
    width: auto;
    height: 50%;
    bottom: 0;
    position: fixed;
    font-size: 2em;
`
const Span = styled.span`
    color: white;
`

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
