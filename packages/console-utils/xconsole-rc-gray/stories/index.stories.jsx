import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WindProRcGray from '../src/index'

storiesOf('WindProRcGray', module)
  .add('WindProRcGray', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <WindProRcGray />
      </div>
    </div>);
  })
