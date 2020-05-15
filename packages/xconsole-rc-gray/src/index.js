import React from 'react'
import PropTypes from 'prop-types'
import { ConsoleBaseContext } from '@alicloud/xconsole-console-base-context'
import get from 'lodash.get'
import './index.less'

const Gray = ({
  id,
  children,
}) => {
  if (typeof id === 'undefined') {
    throw new Error(
      '[Gray] id is required'
    )
  }
  const { gray } = React.useContext(ConsoleBaseContext)
  const value = get(gray, id)
  if (value === false) return null
  return children
}

Gray.displayName = 'WindProGray'

Gray.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}

export default Gray
