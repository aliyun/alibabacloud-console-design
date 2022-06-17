import * as React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
import { open, render, unmount } from '../src';

window.React = React;
window.ReactDOM = ReactDOM;

storiesOf('FastLogin', module)
  .add('FastLogin', () => {
    const onClick = async () => {
      try {
        const result = await render({ target: document.querySelector('test'), env: 'prepub', height: 518, width: 782 });
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
