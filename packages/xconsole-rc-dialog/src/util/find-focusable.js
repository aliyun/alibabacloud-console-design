import _filter from 'lodash/filter';

/**
 * 元素是否可见
 * 
 * @param {Element} el
 * @return {boolean}
 */
function isVisible(el) {
  while (el) {
    if (el === document.body || el === document.documentElement) {
      break;
    }
    
    if (el.style.display === 'none' || el.style.visibility === 'hidden') {
      return false;
    }
    
    el = el.parentNode;
  }
  
  return true;
}

/**
 * 元素是否可以获取焦点
 * 
 * @param {Element} el
 * @return {boolean}
 */
function isFocusable(el) {
  const nodeName = el.nodeName.toLowerCase();
  const hasTabIndex = parseInt(el.getAttribute('tabindex'), 10) > -1; // 不要用 Number() 因为很多情况 Number 会出 0
  
  if (isVisible(el)) {
    if (nodeName === 'input') {
      return !el.disabled && el.type !== 'hidden';
    }
    
    if (['select', 'textarea', 'button'].includes(nodeName)) {
      return !el.disabled;
    }
    
    if (nodeName === 'a') {
      return el.getAttribute('href') || hasTabIndex;
    }
    
    return hasTabIndex;
  }
  
  return false;
}

/**
 * 获取容器内所有可以获取焦点的子节点
 * 
 * @param {Element} container 容器节点
 * @return {array<Element>}
 */
export default container => _filter(container.querySelectorAll('*'), isFocusable);
