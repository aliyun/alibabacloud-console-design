import React, { Component } from 'react'
import Switch from '@ali/wind/lib/switch'

class RemoteController extends Component {
  state = {
    remoteable: false,
  }

  onChange = this.onChange.bind(this)

  onChange(remoteable) {
    this.setState({ remoteable })
  }

  render() {
    return (
      <div>
        <div>启用远程数据:</div>
        <div>
          <Switch
            checked={this.state.remoteable}
            onChange={this.onChange}
          />
        </div>
        <div>
          {this.props.children(this.state.remoteable)}
        </div>
      </div>
    )
  }
}

export default RemoteController
