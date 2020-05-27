import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Context from './BaseContext'
import ModelProvider from './ModelProvider'

const Provider = props => (
  <ModelProvider app={props.app}>
    {props.children}
  </ModelProvider>
)

Provider.propTypes = {
  app: PropTypes.objectOf(PropTypes.any),
}

export default Provider
