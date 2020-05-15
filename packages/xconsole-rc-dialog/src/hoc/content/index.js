import DialogContext from '../../context/dialog';

/**
 * 通过 Inheritance Inversion 的方式返回一个高阶组件，用于封装 dialog 的 content 与 dialog 本身之间的通讯
 *
 * @param WrappedComponent
 */
export default WrappedComponent => class extends WrappedComponent {
  static displayName = `DialogContent!${WrappedComponent.displayName}`;
  
  static contextType = DialogContext;
  
  componentDidUpdate(...args) {
    if (WrappedComponent.prototype.componentDidUpdate) { // 不能直接来，否则报错
      super.componentDidUpdate(...args); // FIXME 如果使用方用 TS 且 target 非 es5 的情况下可能报错..
    }
    
    const {
      context: {
        field,
        onContentUpdate
      }
    } = this;
    
    if (onContentUpdate) {
      onContentUpdate(field, this.state);
    }
  }
};
