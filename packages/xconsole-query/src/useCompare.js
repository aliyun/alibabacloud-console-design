import React from 'react'
import isEqual from 'lodash.isequal'

export default (value) => {
  const ref = React.useRef(value)
  if (!isEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}
