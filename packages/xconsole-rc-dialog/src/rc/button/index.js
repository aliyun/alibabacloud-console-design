import React from 'react';
import PropTypes from 'prop-types';

import {
  Button
} from '@alicloud/console-components';

export default class extends React.Component {
  static displayName = 'Button';

  static propTypes = {
    children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    // 之前只能通过 children 来设置 - 现在有两种方式，推荐用 label prop
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    href: PropTypes.string,
    // 无痕 SPM 埋点
    spm: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  static Group = Button.Group;

  render() {
    const {
      props: {
        children,
        label,
        spm,
        ...props
      }
    } = this;

    if (spm) {
      props['data-spm-click'] = `gostr=/aliyun;locaid=d${spm}`;
    }

    if (props.href) { // fusion 不会自动做这些判断，而且认为「没必要」 - http://gitlab.alibaba-inc.com/next/button/issues/35282
      props.component = 'a';

      if (!props.target && /^(?:\w+:)?\/\//.test(props.href)) { // 如果是绝对路径，自动添加 target
        props.target = '_blank';
      }
    }

    if (props.component !== 'a') {
      delete props.href;
      delete props.target;
    }

    return <Button {...props}>{label || children}</Button>;
  }
}