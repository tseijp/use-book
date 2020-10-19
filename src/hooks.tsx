import { useCallback, useState, useEffect, useMemo, useRef  } from 'react'
import { PropsType } from './types'
import {getPath} from './utils'

export function useBook (urltext='', {size='LZZZZZZZ',isssl=false,searches=10}:PropsType={}) {
    const host = useMemo(()=>`${ isssl?'images-na.ssl-images-':'images-jp.' }amazon.com`,[isssl])
    const getsrc = useCallback((num:number|string)=>`http://${host}/images/P/${num}.09.${size}`,[host,size])
    const isbns = useRef<number[]>([])                       // TO CALC NEXT SRC!
    const [img, setImg] = useState<any>(null)                  // RETURN MAIN OBJ
    const image = useRef<HTMLImageElement>(new Image())
    const srcRef = useRef<string>('')
    const path = useMemo(()=>getPath(urltext, isbns),[urltext])
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
    //console.log('\tRender useBook',isbns.current);
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
