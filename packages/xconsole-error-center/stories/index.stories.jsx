import React, { useEffect } from 'react';
import '@alicloud/console-components/dist/wind.css';
import '@alicloud/xconsole-rc-dialog/dist/index.css';
import '@alicloud/xconsole-rc-error-prompt/dist/index.css';
import { storiesOf } from '@storybook/react';
import { ErrorPrompt } from '../src/index'

storiesOf('XconsoleErrorCenter', module)
  .add('XconsoleErrorCenter', () => {
    
    useEffect(() => {
      ErrorPrompt({
        code: 'test',
        message: 'sxxxx',
        requestId: 'xxxxx'
      }, {
        dialogType: 'alert'
      })
    }, []);

    return (<div id="app-wrapper">
      <div id="app">
      </div>
    </div>);
  })
