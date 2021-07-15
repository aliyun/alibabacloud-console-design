# xconsole-error-center

> XConsole 错误处理库

## Usage

```js
import { ErrorPrompt as errorPrompt } from '@alicloud/xconsole-error-center';

errorPrompt({
  new Error('There is an error'),
  { 
    errorConfig: {
      message,
      confirmLabel,
      cancelLabel,
      cancelHref,
      confirmHref
    },
    dialogType,
    disableExtraInfo,
  }
});
```

## Usage

```js
import { ErrorPrompt as errorPrompt } from '@alicloud/xconsole-error-center';

errorPrompt({
  new Error('There is an error'),
  { 
    errorConfig: {
      message,
      confirmLabel,
      cancelLabel,
      cancelHref,
      confirmHref
    },
    dialogType,
    disableExtraInfo,
  }
});
```
