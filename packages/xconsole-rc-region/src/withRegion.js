import React, { Component } from 'react'
import { wrapDisplayName } from 'recompose'
import Context from './Context'

const withRegion = WrappedComponent => class H extends Component {
  static displayName = wrapDisplayName(WrappedComponent, 'withRegion')

  render() {
    return (
      <Context.Consumer>
        {value => (
          <WrappedComponent {...this.props} region={value} />
        )}
      </Context.Consumer>
    )
  }
}

export default withRegion
