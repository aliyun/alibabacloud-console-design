import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@alicloud/console-components'
import Context from './Context'

const Submit = ({
  onClick,
  validate = true,
  children,
  ...buttonProps
}) => {
  const form = useContext(Context)
  const onClickWithValidate = () => {
    form.validateFields((err, values) => {
      if (err) return
      onClick(values)
    })
  }
  return (
    <Button
      {...buttonProps}
      onClick={validate ? onClickWithValidate : onClick}
    >
      {children}
    </Button>
  )
}

Submit.propTypes = {
  onClick: PropTypes.func,
  validate: PropTypes.bool,
  children: PropTypes.node,
}

export default Submit
