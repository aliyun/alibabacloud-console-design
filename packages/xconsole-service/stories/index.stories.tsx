import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { createService } from '../src/index'


storiesOf('XconsoleService', module)
  .add('XconsoleService', () => {
    React.useEffect(() => {
      (async function() {
        const request = createService('vpc', 'DescribeVpcs', {
          data: {
            content: JSON.stringify({})
          }
        })({}, true);
        
      })();
    });
   return (<div id="app-wrapper">
      <div id="app">
       
      </div>
    </div>);
  })
