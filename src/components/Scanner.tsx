import React, { useEffect,useCallback, } from "react";
import config from "../../config-camera.json";
import './Scanner.css'

const Quagga = require ('quagga');

type ScannerProps = {
    onStarted  :Function,
    onDetected :Function,
}

export function Scanner ({onStarted, onDetected, ...props}:ScannerProps) {
    useEffect (() => {
        Quagga.init(config, (err:any)=> {
            console.log('Quagga Start');
            if (err)
                return console.log(err, "error msg");
            onStarted(true)
            Quagga.start()
        })
        return () => {
            console.log('Quagga Stop')
            Quagga.stop()
        }
    }, []);
    type drawRectProps = { box:any,drawingCtx:any,color?:string,lineWidth?:number }
    const drawRect = useCallback(({box,drawingCtx,color="green",lineWidth=2}:drawRectProps) => {
        Quagga.ImageDebug.drawPath(box, {x:0,y:1}, drawingCtx, {color,lineWidth})
    }, [])
    console.log('Quagga Render');
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
        Quagga.onDetected( (result:any) => onDetected(result.codeResult.code) )
    });
    return <div id="interactive" className="viewport" style={{width:"100%",height:"100%",top:0,bottom:0}}/>
}
