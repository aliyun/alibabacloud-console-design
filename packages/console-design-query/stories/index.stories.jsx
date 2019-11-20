import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Query from '../src/index'

storiesOf('Query', module)
  .add('Query', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <Query />
      </div>
    </div>);
  })
