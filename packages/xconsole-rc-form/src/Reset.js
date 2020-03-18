import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@alicloud/console-components'
import Context from './Context'

const Reset = ({
  onClick,
  children,
  fields,
  ...buttonProps
}) => {
  const form = useContext(Context)
  return (
    <Button
      {...buttonProps}
      onClick={() => form.resetFields(fields)}
    >
      {children}
    </Button>
  )
}

Reset.propTypes = {
  onClick: PropTypes.func,
  validate: PropTypes.bool,
  children: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.string),
}

export default Reset
