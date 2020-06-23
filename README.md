# use-amazon
===================================== dev ======================================

* ref
* [Amazon の商品画像を取得する](https://www.ipentec.com/document/internet-get-amazon-product-image)
* [プログラミングTypeScript](https://www.amazon.co.jp/dp/4873119049)

### Example
url1 ... https://www.amazon.co.jp/...-Boris-Cherny/dp/4873119049/ref=sr_1_2?__mk_ja_JP=...child=1&keywords=typescript&qid=1592817611&sr=8-2
url2 ... https://www.amazon.co.jp/dp/4873119049
src1 ... http://images-jp.amazon.com/images/P/4873119049
src2 ... http://images-na.ssl-images-amazon.com/images/P/4873119049

### Image
http://images-jp.amazon.com/images/P/{ASIN/ISBN}.{COUNTRY}.{IMAGE}
https://images-na.ssl-images-amazon.com/images/P/{ASIN/ISBN}.{COUNTRY}.{IMAGE}

ISBN(-10||-13) : International Standard Book Number（国際標準図書番号）... (978-)4-87311-904-5
ASIN(-10) : Amazon Standard Identification Number ...
COUNTRY ... 09
IMAGE ...

value    | mean     | w*h size | book size | notes  
:-|:-|:-|:-|:-  
THUMBZZZ | samnale  | 75×75   | 52×75    |  
TZZZZZZZ | small    | 110×110 | 77×110   |  
MZZZZZZZ | middle   | 160×160 | 112×160  |  
LZZZZZZZ | large    | 500×500 | 349×500  | if h<500, return Full size image  

================================================================================

__use-amazon__ is a hook that lets you get product info from url or book cover.
<!--p align="middle">
  <a href="https://codesandbox.io/s/draggable-list-fh8r8"><img src="https://i.imgur.com/qLKJod3.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/cards-fduch"><img src="https://i.imgur.com/H6nXQEq.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/action-sheet-zuwji"><img src="https://i.imgur.com/THKPrmR.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/infinite-slideshow-nigoy"><img src="https://i.imgur.com/cuOfqST.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/viewpager-v364z"><img src="https://i.imgur.com/iwZOfT9.gif" width="400"/></a>
  <a href="https://codesandbox.io/s/rkgzi"><img src="https://i.imgur.com/Walt1Ip.gif" width="400"/></a>
</p-->

<p align="middle"><i>The demos are real click them!</i></p>

### Agenda
* Install via npm
* Quick Started
* Simple example
* Available hooks
* Fantastic Recipes
* Performance pitfalls

### Install via npm

```bash
npm i @tsei/use-amazon
```
### Quick Started
```bash
git clone github.com/tseijp/use-amazon
cd use-amazon
npm i
npm start
```

* open browser and visit [localhost:3000](http://localhost:3000/)
* Now you can go to our [demo](https://tsei.jp/hook/), and try its usage.

### Simple example

<!--p align="middle">
  <a href="https://codesandbox.io/s/react-use-gesture-simple-i5e0j"><img src="https://i.imgur.com/AMzsEi3.gif" width="400"/></a>
</p-->

```jsx
import { useAmazon } from 'use-amazon'

function App() {
    return
}
```

### Available hooks

React-use-gesture exports several hooks that can handle different gestures:

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `useAmazon`  | get amazon data from url                   |
| `useCamera`  | get amazon data from camera                |


### Fantastic Recipes
TODO

### Performance pitfalls
TODO
