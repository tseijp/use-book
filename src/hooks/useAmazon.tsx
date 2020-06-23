import React, { useEffect, useMemo, useRef } from 'react'


//const url = 'www.amazon.co.jp/dp/4873119049'

export function useAmazon (urltext:string, props?:{}) {
    /*props*/
    const SIZE = 'LZZZZZZZ'
    const ISSSL = false

    const host = `${ ISSSL?'images-na.ssl-images-':'images-jp.' }amazon.com`
    const data = useMemo(()=>{
        const url = new URL(`${urltext.match('https')?'':'https://'}${urltext}`)
        const paths = url.pathname.split('/').filter(v=>v)
        const dpind = paths.map((v,i) => v==='dp'&&i ).find(v=>v) || 0
        const dpid = paths.find((_,i)=>i===dpind+1) || ''
        const asin = dpid[0]==='B' ? paths.find((_,i)=>i===dpind+1) :''
        const isbn = dpid[0]!=='B' ? paths.find((_,i)=>i===dpind+1) :''
        const name = dpind > 0 ? paths[0] : ''
        const ref  = paths.find(v=>v.match('ref='))?.split('ref=')[1] || ''
        return {url:`${host}/dp/${asin}`, name, asin, ref, SIZE}
    }, [urltext])
    const img = useMemo(()=>{
        const src = `http://${host}/images/P/${data.asin}.09.${SIZE}`
        const alt =  data.name
        console.log(data);
        return {src, alt}
    }, [data])
    return {img}
}
