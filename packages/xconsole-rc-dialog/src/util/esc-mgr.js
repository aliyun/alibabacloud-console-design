const STACK = []; // 事件处理函数栈

function escHandler(e) {
  if (e.which !== 27) {
    return;
  }
  
  const fn = STACK[STACK.length - 1];
  let fnReturn;
  
  try {
    fnReturn = fn();
  } catch (err) {
    console.warn('[esc-mgr]', err); // eslint-disable-line
  }
  
  if (fnReturn === false) { // 返回 false 或 promise 可以阻止出栈
    return;
  }
  
  // 简单判定是个 Promise
  // 如果返回的是一个 promise 你需要只写额外的关闭或取消方法以防取消或关闭不掉
  if (fnReturn && fnReturn.then) {
    fnReturn.then(() => pullFromStack(fn));
    
    return;
  }
  
  pullFromStack(fn);
}

function pushToStack(fn) {
  STACK.push(fn); // 入栈
  
  if (STACK.length === 1) {
    document.addEventListener('keydown', escHandler, true);
  }
}

function pullFromStack(fn) {
  const fnIndex = STACK.indexOf(fn);
  
  if (fnIndex < 0) { // 有可能已经被干掉了
    return;
  }
  
  STACK.splice(fnIndex, 1);
  
  if (!STACK.length) {
    document.removeEventListener('keydown', escHandler, true);
  }
}

/**
 * 全局的 ESC manager
 * 
 * @param {function} fn fn 可以返回 false 或 promise 的形式阻止自己出栈
 * @param {boolean} [remove]
 * @return {function}
 */
export default (fn, remove) => {
  if (remove) {
    pullFromStack(fn);
  } else {
    pushToStack(fn);
  }
  
  return fn;
};