import _noop from 'lodash/noop';

import React from 'react';

export default React.createContext({
  /**
   * 内容组件需要和 Dialog 需要进行以下交流：
   *
   * - 内容组件有变化，通过 onContentUpdate 告知 Dialog
   * - 内容组件有变化，需要重置焦点
   * - 内容组件「有限」地操作 Dialog
   *    + 锁定 `lock()`
   *    + 解锁 `unlock()`
   *    + 获取默认焦点 `focus()`
   *    + 关闭 `close(result)`
   * - Dialog 可以在 Button 的 `result(field)` 和 `onClick(field)` 主动从内容组件获取数据
   *
   * 这些事情是通过 `./hoc/content` 来完成，你只需要在期望的内容组件上加上 @hocDialogContent 就行
   */
  field: null,
  lock: _noop,
  unlock: _noop,
  focus: _noop,
  close: _noop,
  onContentUpdate: _noop
});
