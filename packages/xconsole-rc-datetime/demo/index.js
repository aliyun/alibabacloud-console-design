// Console Design 主题包
import '@alife/dpl-console-design/index.css'

// Wind 基础样式
// import "@ali/wind/dist/wind.css"

import React from 'react'
import ReactDOM, { render } from 'react-dom'
import Basic from './basic.js'

const mountNode = document.querySelector('#app')

render(
  <div>
    <Basic />
  </div>,
  mountNode
)

// 启用 hmr 功能
if (module.hot) {
  module.hot.accept()
}
