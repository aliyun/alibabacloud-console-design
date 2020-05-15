import React from 'react';
import ReactDOM from 'react-dom';

import TheDemo from './the-demo';

import './index.less';

const mountNode = document.querySelector('#app');

ReactDOM.render(<TheDemo />, mountNode);

// 启用 hmr 功能
if (module.hot) {
  module.hot.accept();
}
