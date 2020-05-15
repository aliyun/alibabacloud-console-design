import React from 'react'
import { connect } from 'dva'
import { Button } from '@ali/wind'
import Risk from '@ali/wind-rc-risk'

const mapDispatchToProps = dispatch => ({
  show(type) {
    return dispatch({
      type: 'test-wind-risk/execute',
      payload: {
        type,
      },
    })
  },
})

const ShowRisk = ({
  show,
  ...restProps,
}) => (
  <div>
    <Risk {...restProps} />
    <p>
      <Button onClick={() => show('sms')}>Show Risk (SMS)</Button>
    </p>
    <p>
      <Button onClick={() => show('email')}>Show Risk (E-mail)</Button>
    </p>
    <p>
      <Button onClick={() => show('ga')}>Show Risk (MFA)</Button>
    </p>
  </div>
)

export default connect(null, mapDispatchToProps)(ShowRisk)
