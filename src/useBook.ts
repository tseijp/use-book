import { useCallback, useState, useEffect, useMemo, useRef  } from 'react'
import {getPath} from './utils'
export function useBook (urltext:string, config?: {
    size: string,
    isssl: boolean,
    search: number,
}): any
export function useBook (urltext='', {size='LZZZZZZZ',isssl=false,search=10}:any={}) {
    const isbns = useRef<number[]>([])
    const image = useRef<HTMLImageElement>(new Image())
    const srcRef = useRef<string>('')
    const host  = useMemo(()=>`${ isssl?'images-na.ssl-images-':'images-jp.' }amazon.com`,[isssl])
    const path  = useMemo(()=>getPath(urltext, isbns),[urltext])
    const [img, setImg] = useState<any>(null)                  // RETURN MAIN OBJ
    const getsrc = useCallback((num:number|string)=>`http://${host}/images/P/${num}.09.${size}`,[host,size])
    const onError = useCallback(()=>{
        const pre = isbns.current[0]
        const len = isbns.current.length
        const num = pre + ~~((len+1)/2)*(len%2*2-1)
        if(len > search || srcRef.current) return                // OVERFLOW !
        isbns.current.push( num )
        return setImg((pre:any)=>({...pre, src:getsrc(num)}))
    }, [getsrc, search])
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
            if (width < 2 || height < 2)
                return onError()
            srcRef.current = image.current.src
        }
    }, [getsrc, onError, path, img.src])
    //console.log('\tRender useBook',isbns.current);
    return {path, image, img}
}
