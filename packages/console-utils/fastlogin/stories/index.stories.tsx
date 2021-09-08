import * as React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { open } from '../src';

window.React = React;
window.ReactDOM = ReactDOM;

storiesOf('FastLogin', module)
  .add('FastLogin', () => {
    const onClick = () => {
      open({env: 'prepub'})
    }

    return (<div id="app-wrapper">
      <div id="app">
        <button onClick={onClick}>open fast login</button>
      </div>
    </div>);
  })
