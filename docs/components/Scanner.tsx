import React, { useEffect, useState } from "react";
import config from "../../config-camera.json";
const Quagga = require ("quagga");

const drawPath = (path: any, ctx: any, xy: any, color: string) =>
  Quagga.ImageDebug.drawPath(path, xy, ctx, {color,lineWidth:2})
const drawRect = (path: any, ctx: any, isMain: boolean) =>
  drawPath(path, ctx, {x:0,y:1}, isMain? '#0F0': "#00F")
const clearRect = (dom: any, ctx: any) =>
  ctx.clearRect(0, 0, ...["width", "height"].map(s => Number(dom.getAttribute(s))))

export type ScannerProps = {
  onStarted: Function
  onDetected: Function
}

export function Scanner (props: ScannerProps) {
  const [started] = useState(props.onStarted)  // err
  const [detected] = useState(props.onDetected) // err

  useEffect (() => {
    Quagga.init(config, (err:any) => {
      if (err) return console.error(err);
      return (Quagga.start(), started(true));
    });
    return () => (Quagga.stop(), started(false));
  }, [started]);

  useEffect(() => {
    Quagga.onDetected((_: any) => detected(_.codeResult.code));
    Quagga.onProcessed((_: any) => {
      if (!_) return;
      const ctx = Quagga.canvas.ctx.overlay;
      const dom = Quagga.canvas.dom.overlay;
      _.boxes && clearRect(dom, ctx);
      _.boxes.forEach((box: any) => drawRect(box, ctx, box===_.box));
      _.codeResult && drawPath(_.line, ctx, {x:"x",y:"y"}, "#F00");
    });
  }, [detected]);
  return <div id="interactive" style={{width:"100%",height:"100%",top:0,bottom:0}}/>;
}
