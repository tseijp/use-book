import {useBook} from './hooks'

export function Grid (props: {
    children: (props:any) => JSX.Element,
    url: string,
}): JSX.Element

export function Grid ({children, url="", ...config}: any) {
    return children(useBook(url, ...config) as any)
}
