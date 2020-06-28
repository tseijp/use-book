import { useMemo } from 'react'


//const url = 'www.amazon.co.jp/dp/4873119049'
type PropsType = {
    size?:string,
    isssl?:boolean,
}

export function useAmazon (urltext='', {size='LZZZZZZZ',isssl=false}:PropsType={}) {
    const host = `${ isssl?'images-na.ssl-images-':'images-jp.' }amazon.com`
    const data = useMemo(()=>{
        const url = new URL(`${urltext.match('https')?'':'https://'}${urltext}`)
        const paths = url.pathname.split('/').filter(v=>v)
        const index = paths.map((v,i) => v==='dp'&&i ).find(v=>v) || 0
        //const dpid = paths.find((_,i)=>i===index+1) || ''
        //const asin = ''//dpid[0]==='B' ? paths.find((_,i)=>i===index+1) :''
        const isbn = paths.find((_,i)=>i===index+1) || ''
        const name = index > 0 ? paths[0] : ''
        const ref  = paths.find(v=>v.match('ref='))?.split('ref=')[1] || ''
        return {url:`${host}/dp/${isbn}`, name, isbn, ref, size}
    }, [urltext, size, host])
    const img = useMemo(()=>{
        const src = `http://${host}/images/P/${data.isbn}.09.${data.size}`
        const alt =  data.name
        return {src, alt}
    }, [data, host])
    return {img, data}
}
