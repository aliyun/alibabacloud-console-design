import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { ErrorConsume } from '../src/index'

storiesOf('XconsoleErrorCenter', module)
  .add('XconsoleErrorCenter', () => {
    
    useEffect(() => {
      ErrorConsume({
        code: 'demo'
      }, {
        demo: {
          title: 'test'
        }
      })
    }, []);

    return (<div id="app-wrapper">
      <div id="app">
      </div>
    </div>);
  })
