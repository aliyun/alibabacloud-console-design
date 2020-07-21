import React, { useEffect } from 'react';
import '@alicloud/xconsole-rc-dialog/dist/index.css';
import '@alicloud/xconsole-rc-error-prompt/dist/index.css';
import { storiesOf } from '@storybook/react';
import { ErrorConsume } from '../src/index'

storiesOf('XconsoleErrorCenter', module)
  .add('XconsoleErrorCenter', () => {
    
    useEffect(() => {
      ErrorConsume({
        code: 'test'
      }, {
        demo: {
          // title: 'test'
        }
      })
    }, []);

    return (<div id="app-wrapper">
      <div id="app">
      </div>
    </div>);
  })
