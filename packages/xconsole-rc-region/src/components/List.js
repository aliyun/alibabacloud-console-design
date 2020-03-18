import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Item from './Item'

const List = ({
  className,
  style,
  label,
  activeId,
  dataSource,
  onItemClick,
  format,
}) => (
  <dl
    className={classNames('wind-rc-region-list', className)}
    style={style}
  >
    {label && <dt>{label}</dt>}
    {
      dataSource.map((item) => {
        let data = item
        if (format) {
          data = format(data)
        }

        return (
          <Item
            key={`wind-rc-region-item-${data.id || data.name}`}
            id={data.id}
            label={data.name}
            active={activeId === data.id}
            disabled={data.disabled}
            onItemClick={onItemClick}
          />
        )
      })
    }
  </dl>
)

List.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  activeId: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
  format: PropTypes.func,
}

export default List
