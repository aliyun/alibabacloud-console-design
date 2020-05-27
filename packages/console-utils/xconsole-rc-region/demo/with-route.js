import React, { Component } from 'react'
import { SmartRegion, RegionContextRoute } from '@ali/wind-rc-region'
import RemoteController from './remote-controller'

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
  render() {
    return (
      <RegionContextRoute
        path="/with-route/:regionId?"
        component={Example}
        dataSource={regionList}
        remoteable
      />
    )
  }
}

export default Basic
