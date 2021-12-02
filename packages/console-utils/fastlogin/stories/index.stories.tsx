import * as React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { open, unmount } from '../src';

window.React = React;
window.ReactDOM = ReactDOM;

storiesOf('FastLogin', module)
  .add('FastLogin', () => {
    const onClick = async () => {
      try {
        const result = await open({ target: document.querySelector('test')});
        console.log(result)
        unmount({env: 'prepub'});
      } catch {
        unmount({env: 'prepub'}); 
      }
    }

    return (<div id="app-wrapper">
      <div id="app">
        <button onClick={onClick}>open fast login</button>
        <div id="test"/>
      </div>
    </div>);
  })
