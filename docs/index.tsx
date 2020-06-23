import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'
import {unregister} from './serviceWorker'

import { useAmazon } from '../src'//'use-amazon'

const App = () => {
    const url = 'www.amazon.co.jp/xxx/dp/4873119049'
    const book = useAmazon(url, {})
    return (
        <img {...book.img}/>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
unregister();
