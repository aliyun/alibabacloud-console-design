import prepareProps from '../util/prepare-props';

import open from './open';

/**
 * 以抽屉模式打开一个 Dialog
 * 
 * @param {object} props
 * @param {function} [updateProps]
 * @return {Promise}
 */
export default (props, updateProps) => open(prepareProps(props, {
  mode: 'slide'
}, {
  title: ' ' // force to have one
}), updateProps);