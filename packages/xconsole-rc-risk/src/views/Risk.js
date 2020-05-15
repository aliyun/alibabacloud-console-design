import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createForm } from 'rc-form'
import Dialog from '@ali/wind/lib/dialog'
import Button from '@ali/wind/lib/button'
import withRcIntl from '@ali/wind-intl/lib/withRcIntl'
import RiskForm from './Form'
import defaultConfig from './defaultConfig'
import defaultMessages from './defaultMessages'

class RiskConfirm extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'sms',
      'email',
      'ga',
    ]),
    visible: PropTypes.bool,
    isSubmitLoading: PropTypes.bool,
    isSubmitDisabled: PropTypes.bool,
    form: PropTypes.objectOf(PropTypes.any),
    config: PropTypes.objectOf(PropTypes.any),
    onClose: PropTypes.func,
    onSend: PropTypes.func,
    onSubmit: PropTypes.func,
    intl: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    config: defaultConfig,
  }

  state = {
    visible: false,
  }

  onClose = this.onClose.bind(this)

  onClose() {
    const { onClose, visible } = this.props
    onClose && onClose()
    if (typeof visible !== 'boolean') {
      this.setState({ visible: false })
    }
  }

  onSubmit = this.onSubmit.bind(this)

  onSubmit() {
    const { onSubmit, form } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      onSubmit && onSubmit(values.verifyCode)
    })
  }

  getTitle() {
    const { type, intl } = this.props
    switch (type) {
      case 'sms': {
        return intl('smsTitle')
      }
      case 'email': {
        return intl('emailTitle')
      }
      case 'ga': {
        return intl('gaTitle')
      }
      default: {
        return ''
      }
    }
  }

  hasError() {
    const { form } = this.props
    const fieldsError = form.getFieldsError()
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  renderFooter() {
    const {
      intl,
      isSubmitLoading,
      isSubmitDisabled,
    } = this.props
    return [
      <Button
        key="risk-confirm-btn"
        type="primary"
        loading={isSubmitLoading}
        disabled={isSubmitDisabled || this.hasError()}
        onClick={this.onSubmit}
      >
        {intl('submit')}
      </Button>,
      <Button
        key="risk-cancel-btn"
        onClick={this.onClose}
      >
        {intl('cancel')}
      </Button>,
    ]
  }

  render() {
    const { visible, ...restProps } = this.props
    const { visible: stateVisible } = this.state
    const exactVisible = typeof visible === 'boolean' ?
      visible : stateVisible

    return (
      <Dialog
        title={this.getTitle()}
        visible={exactVisible}
        className="wind-rc-risk-confirm-dialog"
        onClose={this.onClose}
        footer={this.renderFooter()}
      >
        <RiskForm
          {...restProps}
        />
      </Dialog>
    )
  }
}

export default createForm()(
  withRcIntl({
    defaultMessages,
    componentName: 'Risk',
  })(RiskConfirm)
)
