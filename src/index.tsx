import {useBook} from './useBook'
export {useBook} from './useBook'

export function Book (props: {
  children: (props:any) => JSX.Element,
  url: string,
}): JSX.Element;

export function Book ({children, url="", ...config}: any) {
  return children(useBook(url, ...config) as any);
}
