import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const onLinkClick = (e) => {
  e.preventDefault()
}

const Item = ({
  id,
  label,
  active = false,
  disabled = false,
  onItemClick,
}) => (
  <dd
    className={classNames('wind-rc-region-item', { active, disabled })}
    onClick={e => !disabled && onItemClick(id, e)}
  >
    <a
      title={label}
      name={`#${label}`}
      onClick={onLinkClick}
    >
      {label}
    </a>
  </dd>
)

Item.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onItemClick: PropTypes.func,
}

export default Item
