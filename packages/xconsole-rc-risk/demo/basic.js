import React from 'react'
import { Router, Switch, Route, Redirect } from 'dva/router'
import Risk from './risk'
import './basic.less'

const getSendVerifyCodeParams = originParams => ({
  ...originParams,
  myParams: +new Date(),
})

const sendVerifyCodeCaller = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      reqId: +new Date(),
    })
  }, 1000)
})

const getRequestIdFromResponse = (res) => `${res.reqId}`

const CustomRisk = () => (
  <Risk
    sendVerifyCodeCaller={sendVerifyCodeCaller}
    getSendVerifyCodeParams={getSendVerifyCodeParams}
    getRequestIdFromResponse={getRequestIdFromResponse}
  />
)

const Basic = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/normal" component={Risk} />
      <Route path="/custom" component={CustomRisk} />
      <Redirect to="/normal" />
    </Switch>
  </Router>
)

export default Basic
