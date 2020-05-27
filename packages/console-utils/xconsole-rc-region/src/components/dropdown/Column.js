import React from 'react'
import PropTypes from 'prop-types'
import List from '../List'
import Context from './Context'

const Column = ({
  dataSource,
}) => (
  <Context.Consumer>
    {
      ({ onItemClick, activeId }) => (
        <div>
          {
            dataSource.map(data => (
              <List
                key={`wind-rc-region-list-${data.id}`}
                label={data.name}
                activeId={activeId}
                dataSource={data.list}
                onItemClick={onItemClick}
              />
            ))
          }
        </div>
      )
    }
  </Context.Consumer>
)

Column.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
}

export default Column
