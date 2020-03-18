// Console Design 主题包
import '@alife/dpl-console-design-2018/index.css'
import "@ali/wind/dist/wind.css"
import React from 'react'
import { render } from 'react-dom'
import dva from 'dva'
import createHashHistory from 'history/createHashHistory'
import { model as riskModel } from '@ali/wind-rc-risk'
import createLoading from 'dva-loading'
import Basic from './basic.js'
import model from './model'

window.ALIYUN_CONSOLE_CONFIG = {
  LANG: 'zh',
  SEC_TOKEN: 'mock-sec-token',
};

window.RISK_INFO = {
  GETUA: function () {
    return 'mock-collina-ua'
  },
  UMID: 'mock-umid',
};

const mountNode = document.querySelector('#app')

const app = dva({
  history: createHashHistory(),
})

app.use({
  onError(err) {
    console.error(err)
    err.preventDefault()
  }
})
app.use(createLoading())

app.model(riskModel)
app.model(model)
app.router(Basic)

const App = app.start()

render(
  <div>
    <App />
  </div>,
  mountNode
)

// 启用 hmr 功能
if (module.hot) {
  module.hot.accept()
}
