import _map from 'lodash/map';
import _isPlainObject from 'lodash/isPlainObject';
import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

function toDisplayValue(v) {
  try {
    return JSON.stringify(v);
  } catch (ex) {
    return null;
  }
}

function toLines(o) {
  if (_isPlainObject(o)) {
    return <div>{_map(o, (v, k) => <div key={k}>{k} = {toDisplayValue(v)}</div>)}</div>;
  }
  
  return o;
}

export default class extends React.Component {
  static displayName = '';
  
  static propTypes = {
    details: PropTypes.object
  };
  
  render() {
    const {
      props: {
        details
      }
    } = this;
    
    return <ul className="nb-error-prompt-details">
      {_map(details, (v, k) => <li key={k}>
        <div className="k">{k}</div>
        <div className="v">{toLines(v)}</div>
      </li>)}
    </ul>;
  }
}