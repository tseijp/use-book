export type SheetProps = {
    height  ?:number
    started ?:boolean,
    onOpen  ?:Function|null,
    onClose ?:Function|null,
    children?:any,
}

export type ScannerProps = {
    onStarted  :Function,
    onDetected :Function,
}

export type SliderProps = {
    width   ?:number,
    visible ?:number,
    children?:any,
    style   ?:any
}
