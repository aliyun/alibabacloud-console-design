import '@alife/dpl-console-design/index.css'
import '@ali/wind/dist/wind.css'
import React from 'react'
import dva from 'dva'
import { Router, Route, Switch } from 'dva/router'
import { register } from '@ali/wind-rc-region'
import WithRoute from './with-route'
import WithoutRoute from './without-route'

const app = dva()

app.use(register(app))

const AppRouter = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path="/without-route" component={WithoutRoute} />
      <Route path="/with-route" component={WithRoute} />
    </Switch>
  </Router>
)

app.router(AppRouter)

app.start('#app')
