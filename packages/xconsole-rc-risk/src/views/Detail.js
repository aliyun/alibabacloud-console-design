import React from 'react'
import PropTypes from 'prop-types'
import Form from '@ali/wind/lib/form'
import Link from '@ali/wind-rc-link'

const Detail = ({
  type,
  intl,
  detail,
  config,
  formProps,
}) => {
  let labelText
  let detailText
  let changeLinkText

  switch (type) {
    case 'sms': {
      labelText = intl('smsLabel')
      detailText = intl('smsDetail', { detail })
      changeLinkText = intl('changeMobile')
      break
    }
    case 'email': {
      labelText = intl('emailLabel')
      detailText = intl('emailDetail', { detail })
      changeLinkText = intl('changeEmail')
      break
    }
    case 'ga': {
      labelText = intl('gaLabel')
      changeLinkText = intl('changeMfa')
      break
    }
    default:
      break
  }

  return (
    <Form.Item
      {...formProps}
      label={labelText}
    >
      <p>
        {
          detailText && (
            <strong className="wind-rc-risk-confirm-detail">
              {detailText}
            </strong>
          )
        }
        {
          changeLinkText && (
            <span>
              <Link
                href={config.changeVerificationLink}
                target="_blank"
              >
                {changeLinkText}
              </Link>
            </span>
          )
        }
      </p>
    </Form.Item>
  )
}

Detail.propTypes = {
  type: PropTypes.string,
  detail: PropTypes.node,
  intl: PropTypes.func,
  config: PropTypes.objectOf(PropTypes.any),
  formProps: PropTypes.objectOf(PropTypes.any),
}

export default Detail
