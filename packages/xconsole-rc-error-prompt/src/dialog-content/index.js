import _get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  hocDialogContent,
  hocWrapper
} from '@alicloud/xconsole-rc-dialog';
import {
  Button,
  Icon,
  Pagination
} from '@alicloud/console-components';

import ErrorDetails from './error-details';

import {
  FIELD_NAME
} from '../_common';

import './index.less';

@hocWrapper
@hocDialogContent // 必须离组件最近，否则的无法监听变化
export default class extends React.Component {
  static displayName = 'DialogContent';

  static propTypes = {
    queue: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      details: PropTypes.shape({
        code: PropTypes.string,
        request_id: PropTypes.string
      })
    })),
    intl: PropTypes.func,
    requestIdPriorToCode: PropTypes.bool
  };

  state = {
    detailToggled: false
  };

  _handlePagination = page => {
    const {
      context: {
        field: {
          setValue
        }
      }
    } = this;

    setValue(FIELD_NAME.INDEX, page - 1);
  };

  _handleToggleDetail = () => this.setState(state => ({
    detailToggled: !state.detailToggled
  }));

  render() {
    const {
      context: {
        field: {
          getValue
        }
      },
      props: {
        queue,
        intl,
        requestIdPriorToCode
      },
      state: {
        detailToggled
      }
    } = this;
    const index = getValue(FIELD_NAME.INDEX);
    const {
      message,
      details
    } = queue[index];

    function getJsxMessage() {
      if (!message) {
        return _get(details, 'code') || 'n / a';
      }

      if (React.isValidElement(message)) {
        return message;
      }

      return <span dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: message
      }} />;
    }

    function getButtonLabel() {
      const {
        code,
        request_id
      } = details;

      if (!request_id && !code) {
        return intl('alert_error.details');
      }

      const labelWithRequestId = request_id ? intl('alert_error.details_{request_id}', {
        request_id
      }) : null;
      const labelWithCode = code ? intl('alert_error.details_{code}', {
        code
      }) : null;

      if (requestIdPriorToCode && request_id) {
        return labelWithRequestId || labelWithCode;
      }

      return labelWithCode || labelWithRequestId;
    }

    return <div className={classNames('nb-error-prompt-dialog-content', {
      'with-details': detailToggled
    })}>
      <div className="error-message-holder">{getJsxMessage()}</div>
      {details ? <Button {...{
        className: 'error-detail-toggle',
        text: true,
        onClick: this._handleToggleDetail
      }}>
        {getButtonLabel()}
        <Icon type="arrow-down" />
      </Button> : null}
      {details && detailToggled ? <ErrorDetails {...{
        className: 'error-detail',
        details
      }} /> : null}
      {queue.length > 1 ? <Pagination {...{
        className: 'error-pagination',
        current: index + 1,
        total: queue.length,
        pageSize: 1,
        type: 'simple',
        shape: 'no-border',
        onChange: this._handlePagination
      }} /> : null}
    </div>;
  }
}