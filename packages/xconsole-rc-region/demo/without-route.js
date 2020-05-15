import React, { Component } from 'react'
import { SmartRegion, RegionContext } from '@ali/wind-rc-region'

const regionList = [
  { id: 'cn-beijing', name: '华北1' },
  { id: 'cn-hangzhou', name: '华东1' },
  { id: 'cn-shanghai', name: '华东2' },
  { id: 'cn-zhangjiakou', name: '华北3' },
  { id: 'cn-shenzhen', name: '华南1', endpoint: 'cn-shenzhen' },
]

const Example = () => (
  <strong>
    <SmartRegion />
  </strong>
)

class Basic extends Component {
  state = {
    remoteable: false
  }

  render() {
    return (
      <RegionContext
        key="1"
        component={Example}
        dataSource={regionList}
        remoteable={false}
      />
    )
  }
}

export default Basic
