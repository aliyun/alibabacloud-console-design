/* eslint-disable react/prop-types */
import React, { isValidElement, Children } from 'react'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'

const renderProps = (props, injectPropName) => (...args) => {
  const {
    children,
    render,
    component,
  } = props

  if (component) {
    const RenderComponent = component
    const componentProps = {}
    if (injectPropName) {
      componentProps[injectPropName] = args
    }
    return <RenderComponent {...componentProps} />
  }

  const exactRender = children || render

  if (isFunction(exactRender)) {
    return exactRender(...args)
  }

  if (isValidElement(exactRender)) {
    return <exactRender.type {...exactRender.props} />
  }

  if (isArray(exactRender)) {
    return Children.map(exactRender, child => (
      <child.type {...child.props} />
    ))
  }

  return null
}

export default renderProps
