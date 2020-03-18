// Console Design 主题包
import '@alife/dpl-console-design-2018/index.css'

// Wind 基础样式
// import "@ali/wind/dist/wind.css"

import React from 'react'
import { render } from 'react-dom'
import App from './basic.js'

const mountNode = document.querySelector('#app')

render(
  <div className="container">
    <App />
  </div>,
  mountNode
)

// 启用 hmr 功能
if (module.hot) {
  module.hot.accept()
}
