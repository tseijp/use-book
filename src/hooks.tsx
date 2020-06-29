import { useCallback, useState, useEffect, useMemo, useRef  } from 'react'
type PropsType = {
    size?:string,
    isssl?:boolean,
    searches?:number,
}
export function useAmazon (urltext='', {size='LZZZZZZZ',isssl=false,searches=10}:PropsType={}) {
    const host = useMemo(()=>`${ isssl?'images-na.ssl-images-':'images-jp.' }amazon.com`,[isssl])
    const getsrc = useCallback((num:number|string)=>`http://${host}/images/P/${num}.09.${size}`,[host,size])
    const isbns = useRef<number[]>([])                       // TO CALC NEXT SRC!
    const [img, setImg] = useState<any>(null)                  // RETURN MAIN OBJ
    const image = useRef<HTMLImageElement>(new Image())
    const srcRef = useRef<string>('')
    //const urlRef = useRef<string>(urltext)
    const path = useMemo(()=>{
        //const url = new URL(`${urlRef.current.match('https')?'':'https://'}${urlRef.current}`)
        const url = new URL(`${urltext.match('https')?'':'https://'}${urltext}`)
        const paths = url.pathname.split('/').filter(v=>v)
        const index = paths.map((v,i) => v==='dp'&&i ).find(v=>v) || 0
        //const dpid = paths.find((_,i)=>i===index+1) || ''
        //const asin = ''//dpid[0]==='B' ? paths.find((_,i)=>i===index+1) :''
        const isbn = paths.find((_,i)=>i===index+1) || ''
        const name = index > 0 ? paths[0] : ''
        const ref  = paths.find(v=>v.match('ref='))?.split('ref=')[1] || ''
        isbns.current.push( parseInt(isbn, 10) )
        //console.log('\t__useMemo path__', isbn);
        return {name, isbn, ref}
    },[])
    const onError = useCallback(()=>{
        const pre = isbns.current[0]
        const len = isbns.current.length
        const num = pre + ~~((len+1)/2)*(len%2*2-1)
        if(len > searches || srcRef.current) return                // OVERFLOW !
        isbns.current.push( num )
        //console.log('\t\t\t~~onError~~', num)
        return setImg((pre:any)=>({...pre, src:getsrc(num)}))
    }, [getsrc, searches])
    useEffect(()=>{
        if (srcRef.current)
            return //console.log('useEffect interupt', srcRef.current)
        const num = isbns.current.slice(-1)[0] || path.isbn
        const src = getsrc(num)
        const alt =  path.name || ''
        setImg({src,alt})//init
        image.current.src = src
        image.current.onload = () => {
            const width = image.current.width
            const height = image.current.height
            //console.log('\t__onLoad__', width, height);
            if (width < 2 || height < 2)
                return onError()
            srcRef.current = image.current.src                     // FINISHED !
        }
        //console.log('\t__useEffect__ setImg', num)
    }, [getsrc, onError, path, img?.src])
    //console.log('\tRender useAmazon',isbns.current);
    return {path, image, img}
}

/*
const getCorrectURL = useCallback((detectedNum:number, searchesNum:number)=>{
    const xhr = new XMLHttpRequest();
    const url = [...Array(searchesNum)].map((_,i)=>{
        const tryNum = detectedNum+~~(i/2)*(i%2*2-1)
        const tryURL = `http://${host}/images/P/${tryNum}`
        xhr.open("HEAD", tryURL, false);
        xhr.send(null);
        return xhr.status<201? tryURL:false//false
    }).filter(v=>v)[0]
    return url
}, [])*/
