@alicloud/xconsole-rc-dialog
====

# 安装

```
tnpm i --save prop-types react react-dom @alife/next @alicloud/xconsole-rc-dialog
```

`@alicloud/xconsole-rc-dialog` 之前的是它的依赖，需要使用者安装。

# 转换你自己的模块

一般来说，不建议在自己代码里到处出现一个三方代码的引用，比较合理的做法是把这个三方包「桥接」成自己的本地模块（如果觉得需要写相对路径很麻烦，推荐用 [webpack 的 alias 配置](https://webpack.js.org/configuration/resolve/#resolve-alias)）。

比如在 `src` 下的 `rc` 目录下都是「自己」的组件。

## `rc/dialog/index.js`

桥接 `@alicloud/xconsole-rc-dialog` 并添加必要的国际化。

```js
import Dialog, {
  open,
  slide,
  alert as alert0,
  confirm as confirm0,
  prompt as prompt0,
  hocDialogContent,
  hocWrapper
} from '@alicloud/xconsole-rc-dialog';

import intl from ':intl';

import './index.less';

export default Dialog;

export {
  open,
  slide,
  hocDialogContent,
  hocWrapper
};

export const alert = (props, {
  ok = intl('_?op', {
    op: 'CONFIRM'
  })
} = {}) => alert0(props, {
  ok
});

export const confirm = (props, {
  ok = intl('_?op', {
    op: 'CONFIRM'
  }),
  cancel = intl('_?op', {
    op: 'CANCEL'
  })
} = {}) => confirm0(props, {
  ok,
  cancel
});

export const prompt = (message, value, {
  ok = intl('_?op', {
    op: 'CONFIRM'
  }),
  cancel = intl('_?op', {
    op: 'CANCEL'
  })
} = {}) => prompt0(message, value, {
  ok,
  cancel
});
```

## rc/dialog/index.less

```less
@import (inline) '~@alicloud/xconsole-rc-dialog/dist/index.css';
```

# 使用

## promise

这是最常用也是最简便的用法。

```js
import {
  slide
} from ':rc/dialog';

export default () => slide({
  title,
  content,
  buttons
});
```

## 组件

如果特别有必要的情况（比如一个组件的实例不想被删除的情况）。

```js
import React from 'react';

import Dialog from ':rc/dialog';

export default class extends React.Component {
  static displayName = 'SomeComponent';

  render() {
    const {
      props: {
        visible
      }
    } = this;

    if (!visible) {
      return null;
    }

    return <Dialog {...{
      title,
      content,
      mode: 'slide',
      buttons,
      onClose // 你需要用它
    }} />;
  }
}
```

# FAQ

## 如何关闭

如果是 `Promise` 的用法，你可以不必顾虑，它会自动关闭，关闭的同时，`Promise` 会 `resolve` 或 `reject`（你此时无法监听 `onClose`）。

如果是组件用法，你需要在 props 中添加 `onClose`，并且自己控制是否渲染 `Dialog`。

待补充，可直接问 @驳是。