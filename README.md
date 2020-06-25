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

# use-amazon

__use-amazon__ is a hook that lets you get product info from url or book cover.

### Agenda
* Install via npm
* Quick Started
* Simple example
* Available hooks
* Fantastic Recipes
* Performance pitfalls

### Install via npm
```bash
npm i use-amazon
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

```js
import React from 'react'
import { useAmazon } from 'use-amazon'

function App() {
    const url = 'https://amazon.com/xxx/dp/yyy'
    const book = useAmazon(url)
    return <img {...book.img} />
}
```

### Available hooks
use-amazon exports several hooks that can handle

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `useAmazon`  | get amazon data from url                   |


### Fantastic Recipes
TODO

### Performance pitfalls
TODO
