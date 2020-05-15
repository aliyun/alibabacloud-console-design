import * as React from 'react';
import { storiesOf } from '@storybook/react';
import WidgetLoadManagement from '../src/index'

storiesOf('WidgetLoadManagement', module)
  .add('WidgetLoadManagement', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <WidgetLoadManagement />
      </div>
    </div>);
  })
