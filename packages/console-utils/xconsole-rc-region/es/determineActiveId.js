function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import { getActiveId } from './cookie';
/**
 * 从数据集合项中获取regionId
 * @param {(String|Object)} item
 */

var getIdFromItem = function getIdFromItem(item) {
  // 数据集合中可能是一个只包含 regionId 的数组
  if (typeof item === 'string') {
    return item;
  }

  if (isPlainObject(item)) {
    return item.id;
  }
};
/**
 * 确定当前有效的regionId
 * @param {?String} id 用户传入的id
 * @param {?String} currentActiveId 当前的activeId (一般情况下从model中获取)
 * @param {Array.<(String|Object)>} dataSource 当前region列表
 * @returns {String}
 */


var determinActiveId = function determinActiveId(id, currentActiveId, dataSource) {
  // currentActiveId 一般情况下由调用者从 model 进行获取.
  // 一般情况下, 这个值与 getActiveId 函数返回的结果是一致的.
  // 没有调用者从 model 中获取失败, 或调用者明确不为该参数赋值,
  // 则使用 getActiveId 从 cookie 中取值进行兜底, 尽量让该值保持一个有效的状态.
  // 只有在用户第一次访问控制台时, 该值可能为空
  var exactCurrentActiveId = currentActiveId || getActiveId(); // 对 dataSource 进行预处理, 如果不符合期望, 则直接返回当前的 activeId
  // 之所以没有返回用户声明的 id, 是因为用户的输入无法进行预测,
  // 返回当前 activeId 是最保险的做法

  if (!isArray(dataSource) || !dataSource.length) {
    return exactCurrentActiveId;
  } // 如果用户未声明传入的id, 则使用当前的 activeId 进行填充并进行后续的比较过程


  var expectedActiveId = id || exactCurrentActiveId; // 如果上面的执行过程仍未获取到任何有效符合期望的结果,
  // 则使用 dataSource 中的第一个数据项中的 id 作为结果返回

  if (!expectedActiveId) {
    return getIdFromItem(dataSource[0]);
  }

  var isValidCurrentActiveId = false;

  var _iterator = _createForOfIteratorHelper(dataSource),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var itemId = getIdFromItem(item); // 使用尽量短的循环将 id 与 region 列表中的每一项进行比较
      // 一旦命中匹配, 立即返回结果

      if (expectedActiveId === itemId) {
        return expectedActiveId;
      } // 判定当前的 activeId 是否在给定的集合内


      if (exactCurrentActiveId === itemId) {
        isValidCurrentActiveId = true;
      }
    } // 没有命中任何匹配, 但是当前的 activeId 在集合内,
    // 则直接使用当前的 activeId 作为返回值

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (isValidCurrentActiveId) {
    return exactCurrentActiveId;
  } // 既没有命中任何匹配, 且当前的 activeId 也不再集合内,
  // 则将集合中的第一个数据项的 id 作为返回值


  return getIdFromItem(dataSource[0]);
};

export default determinActiveId;