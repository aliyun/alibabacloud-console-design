import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from '@ali/wind/lib/form'
import Button from '@ali/wind/lib/button'
import Input from '@ali/wind/lib/input'

class Captcha extends Component {
  static propTypes = {
    type: PropTypes.string,
    intl: PropTypes.func,
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    formProps: PropTypes.objectOf(PropTypes.any),
    timer: PropTypes.number,
    debounce: PropTypes.number,
    hasSendButton: PropTypes.bool,
    onSend: PropTypes.func,
    onSmsSend: PropTypes.func,
    onEmailSend: PropTypes.func,
    isSendCodeLoading: PropTypes.bool,
    verifyCodeError: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    debounce: 60,
  }

  state = {
    loading: false,
    timer: 0,
  }

  componentWillUnmount() {
    this._clear()
  }

  onSendButtonClick = this.onSendButtonClick.bind(this)

  onSendButtonClick() {
    const {
      isSendCodeLoading,
      timer,
      debounce,
    } = this.props

    const onSend = this.getOnSendRef()

    if (onSend) {
      const result = onSend()
      if (result && typeof result.then === 'function') {
        this._beforeQueue = []
        this._resolveQueue = []
        this._rejectQueue = []

        if (typeof isSendCodeLoading === 'undefined') {
          this._beforeQueue.push(() => {
            this.setState({ loading: true })
          })
          this._resolveQueue.push(() => {
            this.setState({ loading: false })
          })
          this._rejectQueue.push(() => {
            this.setState({ loading: false })
          })
        }

        if (typeof timer === 'undefined') {
          this._resolveQueue.push(() => {
            this.setState({ timer: debounce })
            this._interval = setInterval(() => {
              this.setState((prevState) => {
                if (prevState.timer === 0) {
                  clearInterval(this._interval)
                  this._interval = null
                } else {
                  return {
                    timer: prevState.timer - 1,
                  }
                }
              })
            }, 1000)
          })
        }

        this._execBeforeQueue()

        result.then((res) => {
          this._execResolveQueue()
          return res
        }).catch((err) => {
          this._execRejectQueue()
          throw err
        })
      }
      return result
    }
  }

  getOnSendRef() {
    const { onSend, onSmsSend, onEmailSend, type } = this.props
    let ref

    switch (type) {
      case 'sms': {
        ref = onSmsSend
        break
      }
      case 'email': {
        ref = onEmailSend
        break
      }
      default: {
        break
      }
    }

    if (!ref) {
      ref = onSend
    }

    return ref
  }

  _beforeQueue = null

  _resolveQueue = null

  _rejectQueue = null

  _interval = null

  _execQueue(queue) {
    if (queue && queue.length) {
      queue.forEach(fn => fn())
    }
  }

  _execBeforeQueue() {
    this._execQueue(this._beforeQueue)
    this._beforeQueue = null
  }

  _execResolveQueue() {
    this._execQueue(this._resolveQueue)
    this._resolveQueue = null
  }

  _execRejectQueue() {
    this._execQueue(this._rejectQueue)
    this._rejectQueue = null
  }

  _clear() {
    clearInterval(this._interval)
    this._interval = null
    this._beforeQueue = null
    this._resolveQueue = null
    this._rejectQueue = null
  }

  renderSendButton() {
    const { type } = this.props
    if (type === 'sms' || type === 'email') {
      // Only render `send` button on `sms` and `email` type.
      const { timer, isSendCodeLoading, intl } = this.props
      const isLoading = typeof isSendCodeLoading === 'boolean' ?
        isSendCodeLoading : this.state.loading
      const exactTimer = typeof timer === 'number' ? timer : this.state.timer
      return exactTimer === 0 ? (
        <Button
          loading={isLoading}
          onClick={this.onSendButtonClick}
        >
          {intl('sendCaptchaCode')}
        </Button>
      ) : (
        <Button disabled>
          {intl('countdown', { seconds: exactTimer })}
        </Button>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      formProps,
      form,
      intl,
      verifyCodeError: propsVerifyCodeError,
    } = this.props

    const verifyCodeError = (
      propsVerifyCodeError ||
      form.getFieldError('verifyCode')
    )

    return (
      <Form.Item
        {...formProps}
        label={intl('captchaLabel')}
        validateState={verifyCodeError ? 'error' : 'success'}
        help={verifyCodeError}
      >
        {
          form.getFieldDecorator('verifyCode', {
            rules: [
              {
                required: true,
                message: intl('captchaEmptyError'),
              },
            ],
          })(
            <Input
              className="wind-rc-risk-confirm-code-input"
              state={verifyCodeError ? 'error' : undefined}
            />
          )
        }
        {this.renderSendButton()}
      </Form.Item>
    )
  }
}

export default Captcha
