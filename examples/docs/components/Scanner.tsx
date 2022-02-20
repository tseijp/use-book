import React, { useEffect, useRef } from "react";
import { Any, Fun } from 'use-midi/src'

const Quagga = require("quagga");

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

type DrawPathArgs = [
  path: object,
  xy: {x: number|string, y: number|string},
  ctx: CanvasRenderingContext2D
]

function drawPath (color: string, ...args: DrawPathArgs) {
  Quagga.ImageDebug.drawPath(...args, {color, lineWidth:2})
}

export function Scanner (props: ScannerProps) {
  const started = useRef<Fun>(props.onStarted)  // err
  const detected = useRef<Fun>(props.onDetected) // err

  if (typeof window === "undefined") return

  useEffect (() => {
    setTimeout(() => {
      Quagga.init(cameraConfig, (err: Error) => {
        if (err) return console.error(err);
        return (Quagga.start(), started.current?.(true));
      });
      Quagga.onDetected((_: Any) => detected.current?.(_.codeResult.code));
      Quagga.onProcessed((_: Any) => {
        if (!_) return;
        const ctx = Quagga.canvas.ctx.overlay;
        const dom = Quagga.canvas.dom.overlay;
        const width = Number(dom.getAttribute("width"));
        const height = Number(dom.getAttribute("height"));
        if (_.boxes) ctx.clearRect(0, 0, width, height);
        _.boxes.forEach((box: typeof _.box) =>
          drawPath(box===_.box? '#0F0': "#00F", box, {x:0, y:1}, ctx)
        );
        if (_.codeResult) drawPath("#F00", _.line, {x:"x",y:"y"}, ctx)
      });
    }, 1)
    return () => (Quagga.stop(), started.current?.(false));
  }, []);

  return <div id="interactive" style={{width:"100%",height:"100%",top:0,bottom:0}}/>;
}
