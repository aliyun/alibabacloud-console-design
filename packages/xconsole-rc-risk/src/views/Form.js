import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from '@ali/wind/lib/form'
import Detail from './Detail'
import Captcha from './Captcha'
import defaultMessages from './defaultMessages'
import defaultConfig from './defaultConfig'

const defaultFormProps = {
  labelAlign: 'left',
  labelTextAlign: 'right',
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

class RiskForm extends Component {
  static propTypes = {
    // 风控类型
    type: PropTypes.string,
    // 风控详情 (经过脱敏的用户手机号/邮箱)
    detail: PropTypes.node,
    // 国际化字典
    messages: PropTypes.objectOf(PropTypes.any),
    // 组件配置项
    config: PropTypes.objectOf(PropTypes.any),
    // 表单对象 (通过 rc-form/createForm 传入)
    form: PropTypes.objectOf(PropTypes.any),
    // 表单组件属性
    formProps: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    messages: defaultMessages,
    config: defaultConfig,
    formProps: defaultFormProps,
  }

  render() {
    const {
      formProps,
    } = this.props

    return (
      <Form {...formProps}>
        <Detail {...this.props} />
        <Captcha {...this.props} />
      </Form>
    )
  }
}

export default RiskForm
