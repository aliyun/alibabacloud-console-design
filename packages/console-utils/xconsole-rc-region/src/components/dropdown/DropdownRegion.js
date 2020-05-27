/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '@alicloud/console-components'
import find from 'lodash/find'
import { seperateToColumns } from '../../data/transform'
import Container from '../Container'
import Trigger from './Trigger'
import Column from './Column'
import Context from './Context'

class DropdownRegion extends Component {
  static propTypes = {
    activeId: PropTypes.string,
    dataSource: PropTypes.arrayOf(PropTypes.any),
    onItemClick: PropTypes.func,
  }

  static getDerivedStateFromProps(nextProps) {
    const { dataSource } = nextProps
    return {
      columns: seperateToColumns(dataSource),
    }
  }

  state = {
    visible: false,
    columns: [],
  }

  onVisibleChange = this.onVisibleChange.bind(this)

  onVisibleChange(visible) {
    this.setState({ visible })
  }

  render() {
    const { visible, columns } = this.state
    const { activeId, dataSource, onItemClick } = this.props
    const { name } = find(
      dataSource,
      { id: activeId }
    ) || {}

    const trigger = (
      <Trigger
        label={name}
        active={visible}
      />
    )
    const providerValue = { activeId, onItemClick }

    return (
      <Container shape="dropdown">
        <Dropdown
          trigger={trigger}
          visible={visible}
          delay={0}
          onVisibleChange={this.onVisibleChange}
        >
          <div className="wind-rc-region-dropdown-content">
            <Context.Provider value={providerValue}>
              {
                columns.map((column, i) => (
                  <Column
                    key={`wind-rc-region-column-${i}`}
                    dataSource={column}
                  />
                ))
              }
            </Context.Provider>
          </div>
        </Dropdown>
      </Container>
    )
  }
}

export default DropdownRegion
