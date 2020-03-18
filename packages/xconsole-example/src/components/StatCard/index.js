import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Card } from '@alicloud/xconsole/ui'
import _ from 'lodash'
import './index.scoped.less'

const { Row, Col } = Grid
const spans = { xxs: '24', xs: '24', s: '12', m: '6' }
const CardProps = {
  showTitleBullet: false,
  showHeadDivider: false,
  contentHeight: 'auto',
}

const renderItems = (dataSource, items) => _.map(items, ({
  dataIndex,
  title,
  icon,
}) => (
  <Col {...spans} key={dataIndex} >
    <span styleName="count">
      {dataSource[dataIndex]}
    </span>
    <h3>
      <Icon styleName="icon" type={icon} size="xs" />
      {title}
    </h3>
  </Col>
))

const StatCard = ({ title, items, dataSource }) => (
  <Card title={title} {...CardProps}>
    <div styleName="stat-card">
      <Row justify="space-between" wrap>
        { items && renderItems(dataSource, items) }
      </Row>
    </div>
  </Card>
)

StatCard.propTypes = {
  title: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.any),
  dataSource: PropTypes.objectOf(PropTypes.any),
}

export default StatCard
