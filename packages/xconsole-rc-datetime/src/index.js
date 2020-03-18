import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import intl from '@alicloud/console-components-intl'
import moment from 'moment'
import './index.less'

const DateTime = ({
  value,
  format,
}) => {
  if (!value) {
    return null
  }

  const realTime = moment(value)

  return (
    <Fragment>{intl.date(realTime, format)}</Fragment>
  )
}

DateTime.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  format: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default DateTime
