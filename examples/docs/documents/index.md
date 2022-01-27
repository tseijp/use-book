---
sidebar_position: 0
---

# Introduction to React UseBook

UseBook is designed as a the foundation for React design systems and component libraries.

## Modern React​

Made with modern React APIs including function components and hooks. Ready for use with modern React APIs including Concurrent Mode and Server Components.

## Installation​
To install the entire use-book lib:
```bash
npm i use-book
```

or

```bash
yarn add use-book
```

## Getting Started

Run the development server:

```
cd use-book
yarn init
yarn start
```

Your site starts at [http://localhost:3000](http://localhost:3000).


## Simple Example

```js
import { useBook } from "use-book";

function BookCoveer (props) {
  const state = useBook(props)
  return <img src={state.src} />
}
```
