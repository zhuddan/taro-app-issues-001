/* eslint-disable perfectionist/sort-imports */
import abortcontroller from 'abortcontroller-polyfill/dist/abortcontroller'

/* eslint-disable import/first */
if (typeof window !== 'undefined' && !window.AbortController) {
  globalThis.AbortController = abortcontroller
}


import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'

import './app.scss'
import { Provider } from './provider'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })  

  // children 是将要会渲染的页面
  return  <Provider>
  {children}
  </Provider>
}
  


export default App
