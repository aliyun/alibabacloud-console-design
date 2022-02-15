



import React from 'react';
import ReactDOM from 'react-dom';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { createService } from '../src/index'

import '@alicloud/console-components/dist/xconsole.css'

// @ts-ignore
window.ALIYUN_CONSOLE_CONFIG = {
  CHANNEL: "OFFICIAL"
}

window.React = React;
window.ReactDOM = ReactDOM
storiesOf('XConsole FastLogin', module)
  .addDecorator(withKnobs)
  .add('FastLogin', () => {
    React.useEffect(() => {
      (async () => {
        await createService('consoledemo', 'ConsoleNeedLogin', { fastLogin: true })({ xxxx:1 })
      })()
    })
    return <div/>
  })
