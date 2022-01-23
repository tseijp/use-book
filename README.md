
# use-book

📚 __use-book__ is a hook that lets you get product info from url or book cover in React.

<p align="center">
  <a href="https://github.com/tseijp/use-book">    <img alt="build passin"src="https://img.shields.io/badge/build-passing-green.svg"/></a>
  <a href="https://github.com/tseijp/use-book">    <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
  <a href="https://www.npmjs.com/package/use-book"><img alt="npm package" src="https://img.shields.io/badge/npm_package-0.1.0-green.svg"/></a>
  <a href="https://twitter.com/tseijp" >           <img alt="twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
</p>

<p align="middle">
  <a href="https://tsei.jp/hook/use-book"><img src="https://i.imgur.com/TayLxZL.gif" width="400"/></a>
  <a href="https://tsei.jp/hook/use-book"><img src="https://i.imgur.com/w3yDcjt.gif" width="400"/></a>
  <a href="https://tsei.jp/hook/use-book"><img src="https://i.imgur.com/ulvQQxw.gif" width="400"/></a>
  <a href="https://tsei.jp/hook/use-book"><img src="https://i.imgur.com/DzqbYHz.gif" width="400"/></a>
</p>


### Table of Contents
* [Install via npm](#install-via-npm)
* [Quick started](#quick-started)
* [Simple example](#simple-example)
* [Available hooks](#available-hooks)
* [~~Fantastic recipes~~](#fantastic-recipes)
* [Performance pitfalls](#performance-pitfalls)

### Install via npm
```bash
npm i use-book
```

### Quick started
```bash
git clone github.com/tseijp/use-book
cd use-book
npm i
npm start
```

* open browser and visit [localhost:3000](http://localhost:3000/)
* Now you can go to our [demo](https://tsei.jp/hook/use-book), and try its usage.

### Simple example

```js
import React from 'react'
import { useBook } from 'use-book'

export function App() {
    const book = useBook('https://amazon.com/xxx/dp/xxx')
    return <img {...book.img} />
}
```

### Available hooks

| Hook       | Description                                |
| ---------- | ------------------------------------------ |
| `useBook`  | get amazon data from url                   |


### Performance pitfalls

__URL__

_value_| https://{_HOST_}/images/P/{_ASIN/ISBN_}.{_COUNTRY_}.{_SIZE_}  
:-|:-  
_HOST_ | images-na.ssl-images-amazon.com or images-jp.amazon.com  
_ISBN_ | International Standard Book Number  
_ASIN_ | Amazon Standard Identification Number  
_COUNTRY_|Japan:_09_  

__SIZE__

_value_    | mean     | w*h size | book size | notes  
:-|:-|:-|:-|:-  
`THUMBZZZ` | samnale  | 75×75   | 52×75    |  
`TZZZZZZZ` | small    | 110×110 | 77×110   |  
`MZZZZZZZ` | middle   | 160×160 | 112×160  |  
`LZZZZZZZ` | large    | 500×500 | 349×500  | if h<500, return Full size image  
