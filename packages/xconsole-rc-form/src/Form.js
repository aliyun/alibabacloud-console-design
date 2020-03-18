import React, { isValidElement } from 'react'
import PropTypes from 'prop-types'
import { Form } from '@alicloud/console-components'
import { createForm } from 'rc-form'
import classNames from 'classnames'
import Context from './Context'
import map from 'lodash.map'


const EnhancedForm = ({
  dataSource = {},
  items,
  operation,
  form,
  fixFooter = true,
  className,
  ...formProps
}) => {
  const {
    getFieldDecorator,
    getFieldError,
  } = form

  const formClassName = classNames({
    'wind-pro-rc-form': true,
    [className]: !!className,
    'fix-footer': fixFooter,
  })

  const renderFormItem = ({
    label,
    dataIndex,
    initialValue,
    validateRules,
    element,
    helper,
    visible = true,
    asterisk = false,
  }) => (
    visible && (
      <Form.Item
        key={dataIndex}
        label={label}
        asterisk={asterisk}
        validateState={getFieldError(dataIndex) ? 'error' : 'success'}
        help={getFieldError(dataIndex) || helper}
      >
        {
          getFieldDecorator(dataIndex, {
            initialValue: initialValue || dataSource[dataIndex],
            rules: validateRules,
          })(element)
        }
      </Form.Item>
    )
  )

  const renderOperation = (opt) => {
    if (!isValidElement(opt)) {
      console.warn(
        'Operation is expected to be a class or function as React component'
      )
    }
    return opt
  }

  return (
    <Context.Provider value={form}>
      <div>
        <Form {...formProps} className={formClassName}>
          <div className="wind-pro-rc-form-body">
            {
              items && map(items(form), (item) => {
                if (isValidElement(item)) {
                  return item
                } else {
                  return renderFormItem(item)
                }
              })
            }
          </div>
          <div className="wind-pro-rc-form-footer">
            { operation && renderOperation(operation) }
          </div>
        </Form>
      </div>
    </Context.Provider>
  )
}

EnhancedForm.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.any),
  items: PropTypes.arrayOf(PropTypes.object),
  operation: PropTypes.node,
  form: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  fixFooter: PropTypes.bool,
}

export default createForm()(EnhancedForm)
