import _isString from 'lodash/isString';
import _isNumber from 'lodash/isNumber';
import _isFunction from 'lodash/isFunction';
import _isUndefined from 'lodash/isUndefined';
import _get from 'lodash/get';
import _some from 'lodash/some';
import _reduce from 'lodash/reduce';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import {
  Field
} from '@alicloud/console-components';

import { getStyle , setStyle} from '../../util/dom';
import { on as eventsOn} from '../../util/events';
import findFocusable from '../../util/find-focusable';
import escMgr from '../../util/esc-mgr';
import DialogContext from '../../context/dialog';
import Button from '../button';
import Icon from '../icon';

import './index.less';

const ID_OF_BACKDROP = 'the-nb-rc-dialog-backdrop'; // also used in css
const REG_DATA_ATTR = /^data-/;

const typeStringOrElement = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]);
const INSTANCE_STACK = []; // the stack of dialog instances
const MODE = {
  NORMAL: 'normal',
  SLIDE: 'slide'
};
const MODE_CLASS = {
  [MODE.NORMAL]: 'mode-normal',
  [MODE.SLIDE]: 'mode-slide'
};

function countForBackdrop() {
  return INSTANCE_STACK.reduce((prevValue, v) => prevValue + (v.props.backdrop ? 1 : 0), 0);
}

function inDialog(el, dialog) {
  const {
    refDialog
  } = dialog;

  while (el && el !== document.body) {
    if (el === refDialog) {
      return true;
    }

    el = el.parentNode; // eslint-disable-line no-param-reassign
  }

  return false;
}

/**
 * 判断元素是否 input/textarea 输入框
 *
 * @param {Element} el
 */
function isInput(el) {
  if (el.tagName === 'TEXTAREA') {
    return true;
  }

  return el.tagName === 'INPUT' && el.type === 'text';
}

function focus(el) {
  try {
    el.focus();
    el.select();
  } catch (ex) {
    // ignore ...
  }
}

/**
 * 全局处理，在 dialog 内部接管 TAB 序列，不能只在两端接管，因为浏览器的行为并不一定会把所有我们认为可以获得焦点的按序给予焦点
 *
 * @param {number} step -1 或 1
 */
function takeoverFocus(step) {
  const topDialog = INSTANCE_STACK[INSTANCE_STACK.length - 1];

  if (!topDialog) {
    return false;
  }

  const focusableNodes = findFocusable(topDialog.refDialog);
  const index = focusableNodes.indexOf(document.activeElement); // activeElement Chrome 2+, Firefox 3.0+ IE4 + Opera 9.6+ Safari 4.0+
  const maxIndex = focusableNodes.length - 1;

  if (index < 0) { // 焦点被人工移到外面或者根本没有可获得焦点的内部元素
    focus(focusableNodes[step < 0 ? maxIndex : 0] || topDialog.refDialog);

    return;
  }

  const targetIndex = index + step;

  if (targetIndex < 0) {
    focus(focusableNodes[maxIndex]);

    return;
  }

  if (targetIndex > maxIndex) {
    focus(focusableNodes[0]);

    return;
  }

  focus(focusableNodes[targetIndex]);
}

/**
 * 判断是否有 Fusion 的其他 Overlay 正打开着
 * 这个方法实现的有些..一言难尽，因为我并没有用 Fusion 的 Overlay 来封装 Dialog。
 * Fusion 有如下组件会用到 Overlay
 *
 * - Select
 * - Balloon
 * - Message 的 toast 形式
 * - Dialog（Fusion 自己的）
 *
 * 这些组件都会用 Overlay 包裹自己，但我们只能往里边看它具体是啥
 *
 * @return {boolean}
 */
function hasFusionOverlayOpened() {
  const fusionOverlaysOpened = document.querySelectorAll('.next-overlay-wrapper.opened'); // querySelectorAll 只有 IE6-7 和 FF2-3 不支持

  return _some(fusionOverlaysOpened, v => !v.querySelector('.next-message')); // 忽略 toast message
}

eventsOn(document, 'keydown', e => {
  if (e.keyCode !== 9) { // TAB
    return;
  }

  const taken = takeoverFocus(e.shiftKey ? -1 : 1);

  if (taken !== false) {
    e.preventDefault();
  }
});

export default class extends React.Component {
  static displayName = 'Dialog';

  static propTypes = {
    /* --- 控制内容 --- */
    title: typeStringOrElement, // 标题
    titleExtra: typeStringOrElement,
    content: typeStringOrElement, // 内容
    buttons: PropTypes.arrayOf(PropTypes.oneOfType([ // 按钮（及其行为定义）
      typeStringOrElement, // 相当于 { label: __ }
      PropTypes.shape({
        label: typeStringOrElement, // 用于显示
        disabled: PropTypes.bool,
        alignLeft: PropTypes.bool,
        href: PropTypes.string, // 如果有 href 则直接成为一个 link
        result: PropTypes.any, // Promise 的返回，如果是 function 则将执行结果返回
        resultAsReject: PropTypes.oneOfType([ // 是否强制 Promise reject
          PropTypes.bool,
          PropTypes.func
        ]),
        onClick: PropTypes.func // onClick(field, dialog) 通过 field 跟内容进行交互，通过 dialog 可以关闭
      })
    ])),
    /* --- 控制展示 --- */
    mode: PropTypes.oneOf([
      MODE.NORMAL, MODE.SLIDE
    ]),
    width: PropTypes.oneOfType([
      PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
      PropTypes.number
    ]),
    className: PropTypes.string, // 在 dialog 上的自定义 class，鉴于优先级的原因，请和 `.nb-rc-dialog` 一起定义
    classNameBd: PropTypes.string, // 在 content 节点上添加 class，用以不想为 content 多做一层容器时定义样式
    /* --- 控制行为 --- */
    closable: PropTypes.bool, // 显示关闭按钮
    backdrop: PropTypes.bool, // 是否需要蒙层
    esc: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]), // 键盘的 ESC
    externalClose: PropTypes.bool, // 外部点击是否关闭当前 dialog
    // focus: undefined, // 打开后需要进行焦点获取的元素，必须只能是选择器
    // refocus: PropTypes.element, // 关闭后需要返回焦点的元素
    /* --- 控制结果 --- */
    undefinedAsReject: PropTypes.bool,
    /* --- 控制 Field，参见 fusion-demo.alibaba-inc.com/demos/next/field#demo-api --- */
    field: PropTypes.shape({ // Dialog 会默认创建 field，但如果传入，则会使用传入的 field
      getValues: PropTypes.func,
      getErrors: PropTypes.func
    }),
    fieldOptions: PropTypes.oneOfType([ // 如果传入 false 则不会创建 field（同时会忽略传入的 field）
      PropTypes.bool,
      PropTypes.shape({
        values: PropTypes.object
      })
    ]),
    /* --- DEBUG --- */
    debug: PropTypes.bool,
    /* --- 事件回调 --- */
    /**
     * 内容变化时的回调，参数随意
     */
    onContentUpdate: PropTypes.func,
    /*
     * onBeforeClose(result:*, willReject:boolean) 即将执行关闭前发生，`return false` 可阻止关闭
     */
    onBeforeClose: PropTypes.func,
    /*
     * onClose(result:*, asReject:boolean) 执行关闭后发生（然而，真正的从 DOM 上移除还是必须要使用者自行处理）
     */
    onClose: PropTypes.func
  };

  static defaultProps = {
    buttons: [],
    mode: MODE.NORMAL,
    backdrop: true,
    closable: true,
    esc: true,
    undefinedAsReject: true
  };

  state = {
    locked: false,
    lockedLoading: false,
    active: false, // TODO opening and closing for different animation
    underTop: false
  };

  _field = this._getInitialField();

  _handleEsc = () => this._handleClose(undefined, undefined, true);

  _handleFixedWrapClick = e => {
    const {
      props: {
        externalClose
      }
    } = this;

    if (!externalClose || inDialog(e.target, this)) {
      return;
    }

    this.close();
  };

  _handleContentUpdated = (...args) => {
    const {
      props: {
        onContentUpdate
      }
    } = this;

    if (onContentUpdate) {
      onContentUpdate(...args);
    }

    this._refreshPosition();
  };

  _handleLock = lockedLoading => this.setState({
    locked: true,
    lockedLoading
  });

  _handleUnlock = () => this.setState({
    locked: false,
    lockedLoading: false
  });

  _handleFocus = () => this.focus();

  _handleClose = (result, resultAsReject, viaEsc) => {
    const {
      state: {
        locked
      }
    } = this;

    if (locked || (viaEsc && hasFusionOverlayOpened())) { // ESC 的时候优先关闭 fusion 的 overlay
      return false;
    }

    const beforeCloseReturn = this._fire('onBeforeClose', result, resultAsReject);

    if (beforeCloseReturn === false) {
      return false;
    }

    this._close(result, resultAsReject);

    return true;
  };

  _getInitialField() {
    const {
      props: {
        field,
        fieldOptions
      }
    } = this;

    if (fieldOptions === false) {
      return null;
    }

    if (field) { // 相信传入的就是 Field
      return field;
    }

    return new Field(this, {
      autoUnmount: false,
      ...fieldOptions
    });
  }

  /**
   * 刷新 UI，保证在屏幕上处于比较合理的位置
   */
  _refreshPosition() {
    const {
      props: {
        mode
      }
    } = this;

    if (mode === MODE.SLIDE) {
      return;
    }

    const {
      refDialog
    } = this;
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const dialogH = getStyle(refDialog, 'height');
    const marginTop = (viewportH - dialogH) * 0.45 || 0;

    setStyle(refDialog, {
      marginTop: marginTop < 0 ? 0 : marginTop
    });
  }

  /**
   * 触发回调
   *
   * @param {string} onXx
   * @param args
   */
  _fire(onXx, ...args) {
    const fn = this.props[onXx];

    if (fn) {
      return fn(...args);
    }
  }

  /**
   * 关闭 Dialog，然而，真正的从 DOM 上移除还是必须要靠使用的人在 onClose 上进行处理，但不要慌，在 promised 下边已经封装好了
   *
   * @param {*} result
   * @param {boolean} resultAsReject
   */
  _close(result, resultAsReject) {
    if (!this.state.active) {
      return false;
    }

    // 搞点动画
    this.setState({
      active: false
    }, () => {
      setTimeout(() => {
        const {
          props: {
            undefinedAsReject
          }
        } = this;

        this._fire('onClose', result, resultAsReject || (undefinedAsReject && _isUndefined(result)));
      }, 250); // FIXME hard coded timeout of 250ms
    });
  }

  /**
   * 处理外部事件
   *
   * @param {boolean} [off]
   */
  _doExternalEvents(off) {
    const {
      props: {
        closable,
        esc
      }
    } = this;

    if (off) {
      escMgr(this._handleEsc, true);
    } else if (esc === -1 || (closable && esc)) {
      escMgr(this._handleEsc);
    }
  }

  _forAnimation(active, timeout) {
    const setActive = () => this.setState({
      active
    });

    if (timeout) {
      setTimeout(setActive, 1);
    } else {
      setActive();
    }
  }

  /**
   * 关闭 Dialog
   *
   * @param result
   * @param resultAsReject
   * @return {boolean} true if finally closed, false if kept from being closed
   */
  close(result, resultAsReject) {
    return this._handleClose(result, resultAsReject);
  }

  /**
   * 锁定 Dialog，不可关闭（所有的按钮将置灰）
   * @param {boolean} lockedLoading 在第一个按钮上显示 loading
   */
  lock(lockedLoading) {
    this._handleLock(lockedLoading);

    return this;
  }

  unlock() {
    this._handleUnlock();

    return this;
  }

  /**
   * 当界面产生变化之后，可能需要对 dialog 进行焦点的调整
   */
  focus() {
    const {
      refDialogBd,
      refDialog
    } = this;
    const sortedNodesCanFocus = findFocusable(refDialogBd).sort((v1, v2) => { // 输入框优先排序
      const itIsInput1 = isInput(v1);
      const itIsInput2 = isInput(v2);

      if (itIsInput1 === itIsInput2) {
        return 0;
      }

      if (itIsInput1) {
        return -1;
      }

      return 1;
    });
    let [elToFocus] = sortedNodesCanFocus;

    if (!elToFocus) {
      [elToFocus] = findFocusable(refDialog);
    }

    focus(elToFocus || this.refDialog);
  }

  UNSAFE_componentWillMount() {
    // 把其他的已经存在的 dialog 压下去
    INSTANCE_STACK.forEach(v => v.setState({
      underTop: true
    }));

    INSTANCE_STACK.push(this);

    const backdropCount = countForBackdrop();

    if (backdropCount === 1) {
      const elBackdrop = document.createElement('div');

      elBackdrop.setAttribute('id', ID_OF_BACKDROP);

      document.body.appendChild(elBackdrop);
    }
  }

  componentDidMount() {
    this._refreshPosition();
    this._doExternalEvents();
    this._forAnimation(true, 1);

    setTimeout(() => this.focus(), 0); // 如果 dialog 由 MenuButton 触发，MenuButton 会在其 onClick 之后把焦点进行改变...
  }

  componentWillUnmount() {
    const index = INSTANCE_STACK.indexOf(this);

    if (index >= 0) { // 虽然这不科学 但这严谨
      INSTANCE_STACK.splice(index, 1);
    }

    // 把栈顶的提上来
    if (INSTANCE_STACK.length) {
      INSTANCE_STACK[INSTANCE_STACK.length - 1].setState({
        underTop: false
      });
    }

    const backdropCount = countForBackdrop();

    if (backdropCount <= 0) {
      const elBackdrop = document.getElementById(ID_OF_BACKDROP);

      if (elBackdrop) {
        elBackdrop.parentNode.removeChild(elBackdrop); // .remove 有兼容性问题
      }
    }

    this._doExternalEvents(true);

    setTimeout(takeoverFocus, 5); // 如果还有 Dialog 打开着的话，可以把焦点还到那个 Dialog，very handy

    this._contextValue = null; // GC
  }

  render() {
    const {
      props: {
        title,
        titleExtra,
        content,
        buttons,
        mode,
        width,
        className,
        classNameBd,
        closable
      },
      state: {
        locked,
        lockedLoading,
        active,
        underTop
      },
      _field: field
    } = this;
    const needPrimary = buttons.length > 1 && !buttons.some(v => v.type === 'primary');
    const buttonPropsArr = buttons.map((v, i) => {
      const buttonProps = _isString(v) || React.isValidElement(v) ? {
        label: v
      } : {
        ...v
      };

      if (locked) {
        buttonProps.disabled = true;

        if (i === 0) {
          buttonProps.loading = lockedLoading;
        }
      }

      const {
        label,
        alignLeft,
        result,
        resultAsReject,
        onClick
      } = buttonProps;

      // 删掉不需要的属性
      delete buttonProps.alignLeft;
      delete buttonProps.result;
      delete buttonProps.resultAsReject;

      // 添加属性
      if (!buttonProps.type) {
        if (i === 0) {
          buttonProps.type = needPrimary ? 'primary' : 'normal';
        } else {
          buttonProps.type = 'normal';
        }
      }

      buttonProps.key = buttonProps.key || (_isString(label) ? label : i);

      if (alignLeft) {
        buttonProps.className = classNames(buttonProps.className, 'align-left');
      }

      // 修改既有的属性
      buttonProps.onClick = () => {
        if (onClick && onClick(field, this) === false) { // return false to prevent from closing
          return;
        }

        const finalResult = _isFunction(result) ? result(field) : result;
        const finalResultAsReject = _isFunction(resultAsReject) ? resultAsReject(finalResult) : resultAsReject;

        this.close(finalResult, finalResultAsReject);
      };

      return buttonProps;
    });

    return <div {...{
      className: classNames('nb-rc-dialog-fixed-wrap', MODE_CLASS[mode], {
        'under-top': underTop
      }),
      onClick: this._handleFixedWrapClick
    }}>
      <div className="nb-rc-dialog-scroll-wrap">
        <div {...{
          className: classNames('nb-rc-dialog', className, {
            'is-on': active,
            [`width-${width}`]: width
          }),
          role: 'dialog',
          tabIndex: '0',
          style: _isNumber(width) ? {
            width
          } : undefined,
          ref: el => {
            this.refDialog = el;
          },
          // 所有的 `data-x` 属性需要在 DOM 里面
          ..._reduce(this.props, (result, v, k) => {
            if (REG_DATA_ATTR.test(k)) {
              result[k] = v;
            }

            return result;
          }, {})
        }}>
          {title ? <header className="dialog-hd">
            <h4 className="dialog-hd-title">{title}</h4>
            {titleExtra ? <div className="dialog-hd-extra">{titleExtra}</div> : null}
          </header> : null}
          <div {...{
            className: classNames('dialog-bd', classNameBd),
            ref: el => {
              this.refDialogBd = el;
            }
          }}>
            <DialogContext.Provider value={{ // 不能缓存一份..
              field: this._field,
              lock: this._handleLock,
              unlock: this._handleUnlock,
              focus: this._handleFocus,
              close: this._handleClose,
              onContentUpdate: this._handleContentUpdated
            }}>
              {content}
            </DialogContext.Provider>
            {this._renderDebug()}
          </div>
          {buttonPropsArr.length ? <footer className="dialog-ft">
            {buttonPropsArr.map(v => <Button key={v.key} {...v} />)}
          </footer> : null}
          {closable ? <button {...{
            className: 'dialog-close-x',
            onClick: () => this.close()
          }}>
            <Icon type="close" />
          </button> : null}
        </div>
      </div>
    </div>;
  }

  _renderDebug() {
    const {
      props: {
        debug
      },
      _field: field
    } = this;

    if (!debug || !field) {
      return null;
    }

    const values = field.getValues();
    const errors = field.getErrors();
    let hasError = false;
    let valuesJson;
    let errorsJson;

    for (const e in errors) {
      if (errors.hasOwnProperty(e) && errors[e]) {
        hasError = true;
      }
    }

    try {
      valuesJson = JSON.stringify(values, null, 2);
    } catch (ex) { // 不要让 cyclic 错误阻塞渲染
      valuesJson = ex.message;
    }

    try {
      errorsJson = JSON.stringify(errors, (name, value) => { // 如果 errors 中带有 React 组件的话，会触发「cyclic object」错误，这里搞一下
        if (React.isValidElement(value)) {
          return _get(value, 'props.dangerouslySetInnerHTML.__html', '[react]');
        }

        return value;
      }, 2);
    } catch (ex) { // 不要让 cyclic 错误阻塞渲染
      errorsJson = ex.message;
    }

    return <div className="dialog-debug-field">
      <pre className="values">{valuesJson}</pre>
      <pre className={classNames('errors', {
        'has-error': hasError
      })}>{errorsJson}</pre>
    </div>;
  }
}
