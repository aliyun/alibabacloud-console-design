import _isEqual from 'lodash/isEqual';
import React from 'react';
import ReactDOM from 'react-dom';

import prepareProps from '../util/prepare-props';
import Dialog from '../rc/dialog';

/**
 * 通过方法调用，你无需也不能再利用 onClose 关闭/销毁 Dialog，因为你有更棒的 Promise。
 * 
 * @example
 * 
 * ```
 * // 只关心内容（没有按钮）
 * open(content).then(...);
 * open(<Content />).then(...);
 * 
 * // 自定义标题、内容、按钮
 * open({
 *   title,
 *   content,
 *   buttons
 * }).then(...);
 * 
 * // 内容的更新需要重新调整按钮等
 * open({
 *   title,
 *   content,
 *   buttons,
 *   mode
 * }, filed => ({
 *   buttons: [{
 *     ...theButton,
 *     disabled: fieldHasError(field)
 *   }]
 * }).then(...);
 * ```
 * 
 * 以上都是直接返回 promise 对象，不过有的时候，你希望外部代码可以在 Dialog 生成之后对 Dialog 进行重新渲染（主要是渲染内容），可以传第一个参数为 true，
 * 会返回一个对象，该对象包含 `render` 和 `promise`，你可以利用 render 对 Dialog 进行重新渲染，需要注意的是，你必须在 promise 的 `then` 里关注 Dialog 是否被关闭。
 * 这种情况下，这个 `promise` 一般不会被返回，而是作为一些列 Promise 对象的触发器。
 * 
 * ```
 * const queue = [];
 * let soloDialogResult = null;
 * 
 * ...
 * 
 * const somePromise = new Promise((resolve, reject) => {
 *   queue.push({
 *     resolve,
 *     reject
 *   });
 * });
 * 
 * if (soloDialogResult) {
 *   // do something ...
 *   
 *   return somePromise;
 * }
 * 
 * soloDialogResult = open(true, props);
 * 
 * soloDialogResult.promise.then(result => {
 *   queue.forEach(v => v.resolve(result);
 * }, err => {
 *   queue.forEach(v => v.reject(err);
 * }).then(() => {
 *   queue.length = 0;
 *   
 *   soloDialogResult = null;
 * });
 * 
 * return somePromise;
 * ```
 * 
 * @return {Promise|object}
 */
export default (...args) => {
  let [props, updateProps] = args;
  let indirectPromise;
  
  if (props === true || props === false) {
    [indirectPromise, props, updateProps] = args;
  }
  
  const holder = document.createElement('div');
  let dialogProps = prepareProps(props, { // Dialog 生存期内，会不断更新 dialogProps 这个引用
    onContentUpdate(field, state) {
      render(updateProps && updateProps(field, state)); // TODO fuck into dialog itself
    }
  });
  
  function render(changedProps) {
    if (!changedProps) {
      return;
    }
    
    // 不可有以下新属性进行覆盖
    delete changedProps.onContentUpdate;
    delete changedProps.onClose;
    
    const dialogPropsNew = {
      ...dialogProps,
      ...changedProps
    };
    
    if (_isEqual(dialogPropsNew, dialogProps)) {
      return;
    }
    
    dialogProps = dialogPropsNew;
    
    ReactDOM.render(<Dialog {...dialogProps} />, holder);
  }
  
  const promise = new Promise((resolve, reject) => {
    dialogProps.onClose = (result, resultAsReject) => {
      ReactDOM.unmountComponentAtNode(holder);
      holder.parentNode.removeChild(holder);
      
      if (resultAsReject) {
        reject(result);
      } else {
        resolve(result);
      }
      
      dialogProps = null; // 防止内存泄漏
    };
    
    document.body.appendChild(holder);
    
    ReactDOM.render(<Dialog {...dialogProps} />, holder);
  });
  
  return indirectPromise ? {
    render,
    promise
  } : promise;
};