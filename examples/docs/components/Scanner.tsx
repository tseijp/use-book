import React, { useEffect, useRef } from "react";

const Quagga = require ("quagga");

type Fun = (...args: any) => void

export type ScannerProps = {
  onStarted?: Fun
  onDetected?: Fun
}

const cameraConfig = {
  "inputStream": {
    "type": "LiveStream",
    "constraints": {
      "width": { "min": 450 },
      "height": { "min": 300 },
      "facingMode": "environment",
      "aspectRatio": { "min": 1, "max": 2 }
    }
  },
  "locator": {
    "patchSize": "medium",
    "halfSample": true
  },
  "numOfWorkers": 2,
  "frequency": 10,
  "decoder": {
    "readers": ["ean_reader"]
  },
  "locate": true
}


const drawPath = (path: any, ctx: any, xy: any, color: string) => Quagga.ImageDebug.drawPath(path, xy, ctx, {color,lineWidth:2})
const drawRect = (path: any, ctx: any, isMain: boolean) => drawPath(path, ctx, {x:0,y:1}, isMain? '#0F0': "#00F")
const clearRect = (dom: any, ctx: any) => ctx.clearRect(0, 0, ...["width", "height"].map(s => Number(dom.getAttribute(s))))


export function Scanner (props: ScannerProps) {
  const started = useRef<Fun>(props.onStarted)  // err
  const detected = useRef<Fun>(props.onDetected) // err

  if (typeof window === "undefined") return

  useEffect (() => {
    setTimeout(() => {
      Quagga.init(cameraConfig, (err:any) => {
        if (err) return console.error(err);
        return (Quagga.start(), started.current?.(true));
      });
      Quagga.onDetected((_: any) => detected.current?.(_.codeResult.code));
      Quagga.onProcessed((_: any) => {
        if (!_) return;
        const ctx = Quagga.canvas.ctx.overlay;
        const dom = Quagga.canvas.dom.overlay;
        _.boxes && clearRect(dom, ctx);
        _.boxes.forEach((box: any) => drawRect(box, ctx, box===_.box));
        _.codeResult && drawPath(_.line, ctx, {x:"x",y:"y"}, "#F00");
      });
    }, 1)
    return () => (Quagga.stop(), started.current?.(false));
  }, []);

  useEffect(() => {
  }, []);

  return <div id="interactive" style={{width:"100%",height:"100%",top:0,bottom:0}}/>;
}
