import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ConsoleDesignForm from '../src/index'

storiesOf('ConsoleDesignForm', module)
  .add('ConsoleDesignForm', () => {
   return (<div id="app-wrapper">
      <div id="app">
       <ConsoleDesignForm />
      </div>
    </div>);
  })
