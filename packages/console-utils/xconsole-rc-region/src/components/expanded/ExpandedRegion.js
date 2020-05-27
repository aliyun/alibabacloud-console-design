import React from 'react'
import Container from '../Container'
import List from '../List'

const ExpandedRegion = props => (
  <Container shape="expanded">
    <List
      {...props}
    />
  </Container>
)

export default ExpandedRegion
