import React, { Component } from 'react'
import DateTime from '@alicloud/xconsole-rc-datetime'
import './basic.less'

const date = new Date()
const rawDate = date.toString()
const timestamp = date.getTime()
const consoleTimestamp = '2019-01-01T00:00Z'

export default class Basic extends Component {
  render() {
    return (
      <div>
        <h3>标准时间对象 (Native JavaScript `Date` object)</h3>
        <div>Raw: {rawDate}</div>
        <p>
          <DateTime value={date} />
        </p>
        <h3>Unix时间戳 (11-digits number)</h3>
        <div>Raw: {timestamp}</div>
        <p>
          <DateTime value={timestamp} />
        </p>
        <h3>控制台时间戳 (yyyy-MM-ddThh:mmZ)</h3>
        <div>Raw: {consoleTimestamp}</div>
        <p>
          <DateTime value={consoleTimestamp} />
        </p>
        <h3>仅日期</h3>
        <div>Raw: {rawDate}</div>
        <p>
          <DateTime value={date} format="date" />
        </p>
        <h3>仅时间</h3>
        <div>Raw: {rawDate}</div>
        <p>
          <DateTime value={date} format="time" />
        </p>
      </div>
    )
  }
}
