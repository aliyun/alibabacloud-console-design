import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import intl from '@alicloud/console-components-intl';
import moment from 'moment';

var DateTime = function DateTime(_ref) {
  var value = _ref.value,
      format = _ref.format;

  if (!value) {
    return null;
  }

  var realTime = moment(value);
  return React.createElement(Fragment, null, intl.date(realTime, format));
};

DateTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  format: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
export default DateTime;