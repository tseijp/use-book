import React, { useCallback, useEffect, useRef } from "react";
import config from "../../config-camera.json";
import { ScannerProps } from '../types'
const Quagga = require ('quagga');

export function Scanner ({onStarted, onDetected}:ScannerProps) {
    const onStartedRef = useRef((bool:boolean)=>onStarted(bool))  // err
    const onDetectedRef  = useRef((code:string)=>onDetected(code))// err
    useEffect (() => {
        Quagga.init(config, (err:any)=> {
            if (err) return console.log(err, "error msg");
            return ( Quagga.start(), onStartedRef.current(true), console.log('\t\t__Scanner Start__') )
        })
        return () => 1&&( Quagga.stop(), onStartedRef.current(false), console.log('\t\t~~Scanner stop~~') )
    }, []);
    const drawPath = useCallback((path:any,ctx:any,xy:any,color:string) => Quagga.ImageDebug.drawPath(path,xy,ctx,{color,lineWidth:2}),[])
    const drawRect = useCallback((path:any,ctx:any,isMain:boolean) => drawPath(path,ctx,{x:0,y:1},isMain?'#0F0':"#00F"),[drawPath])
    const clearRect = useCallback((dom:any,ctx:any)=>ctx.clearRect( 0, 0, ...["width","height"].map(s=>Number(dom.getAttribute(s))) ),[])
    useEffect(()=>{
        Quagga.onProcessed((result:any) => {
            if (!result) return
            const ctx = Quagga.canvas.ctx.overlay
            const dom = Quagga.canvas.dom.overlay
            result.boxes && clearRect(dom, ctx)
            result.boxes.forEach( (box:any) => drawRect(box, ctx, box===result.box ))
            result.codeResult && drawPath(result.line, ctx, {x:"x",y:"y"}, "#F00")
        });
        Quagga.onDetected ((result:any) => onDetectedRef.current(result.codeResult.code) )
    }, [drawPath,drawRect,clearRect])
    return <div id="interactive" className="viewport" style={{width:"100%",height:"100%",top:0,bottom:0}}/>
}
