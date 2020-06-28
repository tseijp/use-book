import React, { useEffect, useRef } from "react";
import config from "../../config-camera.json";
import './Scanner.css'

const Quagga = require ('quagga');

type ScannerProps = {
    onStarted  :Function,
    onDetected :Function,
}

export function Scanner ({onStarted, onDetected}:ScannerProps) {
    const onStartedRef = useRef((bool:boolean)=>onStarted(bool))  // err
    const onDetectedRef  = useRef((code:string)=>onDetected(code))// err
    useEffect (() => {
        Quagga.init(config, (err:any)=> {
            if (err)
                return console.log(err, "error msg");
            onStartedRef.current(true)
            Quagga.start()
            console.log('\t\t__Scanner Start__');
        })
        return () => {
            Quagga.stop()
            onStartedRef.current(false)
            console.log('\t\t~~Scanner Stop~~')
        }
    }, []);
    useEffect(()=>{
        type drawRectProps = { box:any,drawingCtx:any,color?:string,lineWidth?:number }
        const drawRect = ({box,drawingCtx,color="green",lineWidth=2}:drawRectProps) => {
            Quagga.ImageDebug.drawPath(box, {x:0,y:1}, drawingCtx, {color,lineWidth})
        }
        Quagga.onProcessed((result:any) => {
            let drawingCtx = Quagga.canvas.ctx.overlay
            let drawingCanvas = Quagga.canvas.dom.overlay
            if (!result)
                return
            if (result.boxes) {
                drawingCtx.clearRect(0,0,
                    Number(drawingCanvas.getAttribute("width")),
                    Number(drawingCanvas.getAttribute("height"))
                );
                result.boxes
                    .filter( (box:any) => box!==result.box )
                    .forEach( (box:any) => drawRect({box, drawingCtx}) );
            }
            if (result.box) drawRect({box:result.box,drawingCtx,color:"#00F"})
            if (!result.codeResult || !result.codeResult.code)
                return
            Quagga.ImageDebug.drawPath(
                result.line, {x:"x",y:"y"},
                drawingCtx , {color:"red",lineWidth:3}
            );
            Quagga.onDetected ((result:any) => onDetectedRef.current(result.codeResult.code) )
        });
    }, [])
    //console.log('\t\tScanner Render');
    return <div id="interactive" className="viewport" style={{width:"100%",height:"100%",top:0,bottom:0}}/>
}
