import { useCallback, useState, useEffect, useMemo, useRef  } from 'react'

export function getPath (urltext="", isbns={current:[] as number[]}) {
  const url = new URL(`${urltext.match('https')? '':'https://' }${urltext}`);
  const paths = url.pathname.split('/').filter(Boolean);
  const index = paths.map((v, i) => v==='dp'&&i ).find(Boolean) || 0;
  const isbn = paths.find((_, i) => i===index+1) || '';
  const name = index > 0? paths[0] : '';
  const ref  = paths.find(v=>v.match('ref='))?.split('ref=')[1] || '';
  isbns?.current?.push( parseInt(isbn, 10) );
  return {name, isbn, ref};
}

export function useBook (urltext:string, config?: {
  size: string,
  isssl: boolean,
  search: number,
}): any

export function useBook (urltext='', {size='LZZZZZZZ',isssl=false,search=10}:any={}) {
  const isbns = useRef<number[]>([]);
  const image = useRef<HTMLImageElement>(new Image());
  const srcRef = useRef<string>('');

  const path  = useMemo(() => getPath(urltext, isbns), [urltext]);
  const host  = useMemo(() => `${isssl
    ? 'images-na.ssl-images-'
    : 'images-jp.' }amazon.com`
  , [isssl]);
  const [img, setImg] = useState<any>(null)

  const getsrc = useCallback((num: number|string) =>
    `http://${host}/images/P/${num}.09.${size}`
  , [host, size])

  const onError = useCallback(() => {
    const pre = isbns.current[0];
    const len = isbns.current.length;
    const num = pre + ~~((len+1)/2)*(len%2*2-1);
    if (len > search || srcRef.current) return;
    isbns.current.push( num );
    return setImg((pre:any) => ({...pre, src:getsrc(num)}));
  }, [getsrc, search]);

  useEffect(() => {
    if (srcRef.current)
      return console.warn('useEffect interupt');
    const num = isbns.current.slice(-1)[0] || path.isbn;
    const src = getsrc(num);
    const alt =  path.name || '';
    setImg({src, alt});
    image.current.src = src;
    image.current.onload = () => {
      const width = image.current.width;
      const height = image.current.height;
      if (width < 2 || height < 2) return onError();
      srcRef.current = image.current.src;
    }
  }, [getsrc, onError, path, img]);

  return {path, image, img};
}
