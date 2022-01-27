# Available book apis

## React

use-book exports several hooks and components that can handle different book:

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `useBook`    | Handles the book info                      |

### Usage

```js
const state = useBook(props)
return <img src={state.src}>
```

- `props` is an object containing options for the book
- `state` is an object containing all attributes of the book.

Components is a shorthand for passing hooks directly to children.

```js
return (
  <UseBook {...props}>
    {state => <img src={state.src} />}
  </UseNote>
)
// or
return (
  <UseNote as="div" {...props}/>
)
```


### Performance pitfalls

__URL__

_value_| https://{_HOST_}/images/P/{_ASIN/ISBN_}.{_COUNTRY_}.{_SIZE_}  
:------|:------  
_HOST_ | images-na.ssl-images-amazon.com or images-jp.amazon.com  
_ISBN_ | International Standard Book Number  
_ASIN_ | Amazon Standard Identification Number  
_COUNTRY_|Japan:_09_  

__SIZE__

_value_    | key | mean     | w*h size | book size | notes  
:----------|:----|:---------|:---------|:----------|:-  
`THUMBZZZ` | xs  | samnale  | 75×75   | 52×75    |  
`TZZZZZZZ` | sm  | small    | 110×110 | 77×110   |  
`MZZZZZZZ` | md  | middle   | 160×160 | 112×160  |  
`LZZZZZZZ` | lg  | large    | 500×500 | 349×500  | if h<500, return Full size image  
