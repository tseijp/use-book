import { createGlobalStyle } from "styled-components";

export const Style = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
  }

  html, body, #root {
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif;
    background: #000;
  }

  /* FOR SCANNER*/
  #interactive.viewport canvas.drawingBuffer,
  #interactive.viewport canvas, video {
    width:100%; height: auto; position: absolute;
    top: 0; left: 0; border-radius:2em 2em 0px;
  }
`
