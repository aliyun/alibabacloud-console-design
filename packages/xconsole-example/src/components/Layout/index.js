import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@alicloud/xconsole/ui'
import { map } from 'lodash'
import './index.scoped.less'

const { Row, Col } = Grid
const leftSpans = { xs: '24', s: '24', m: '16' }
const rightSpans = { xs: '24', s: '24', m: '8' }
const CommonStyles = { marginBottom: 16 }

const OverviewLayout = props => (
  <div className="over-view">
    <Row gutter="16" wrap>
      <Col {...leftSpans}>
        {map(props.leftItems, (item, i) => (
          <div style={CommonStyles} key={`left-item-${i}`}>
            {item}
          </div>
        ))}
      </Col>
      <Col {...rightSpans}>
        {map(props.rightItems, (item, i) => (
          <div key={`right-item-${i}`}>
            {item}
          </div>
        ))}
      </Col>
    </Row>
  </div>
)

OverviewLayout.propTypes = {
  leftItems: PropTypes.arrayOf(PropTypes.any),
  rightItems: PropTypes.arrayOf(PropTypes.any),
}

export default OverviewLayout
