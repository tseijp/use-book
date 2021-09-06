export function getPath (urltext="", isbns={current:[] as number[]}) {
    //const url = new URL(`${urlRef.current.match('https')?'':'https://'}${urlRef.current}`)
    const url = new URL(`${urltext.match('https')?'':'https://'}${urltext}`)
    const paths = url.pathname.split('/').filter(v=>v)
    const index = paths.map((v,i) => v==='dp'&&i ).find(v=>v) || 0
    //const dpid = paths.find((_,i)=>i===index+1) || ''
    //const asin = ''//dpid[0]==='B' ? paths.find((_,i)=>i===index+1) :''
    const isbn = paths.find((_,i)=>i===index+1) || ''
    const name = index > 0 ? paths[0] : ''
    const ref  = paths.find(v=>v.match('ref='))?.split('ref=')[1] || ''
    isbns?.current?.push( parseInt(isbn, 10) )
    //console.log('\t__useMemo path__', isbn);
    return {name, isbn, ref}
}
