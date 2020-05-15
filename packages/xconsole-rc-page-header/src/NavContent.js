import React from 'react'
import PropTypes from 'prop-types'
import Page from '@alicloud/console-components-page'
import { Tab } from '@alicloud/console-components'
import map from 'lodash.map'

const NavContext = ({
  nav: {
    shape = 'tab',
    defaultActiveKey,
    activeKey,
    onChange,
    items,
  },
  children,
}) => {
  if (shape === 'menu') {
    const Menu = (
      <Page.Menu
        onItemClick={onChange}
        defaultSelectedKeys={defaultActiveKey}
        selectedKeys={activeKey}
      >
        {
          map(items, item => (
            <Page.Menu.Item key={item.key}>
              {item.title}
            </Page.Menu.Item>
          ))
        }
      </Page.Menu>
    )

    return (
      <Page.Content menu={Menu}>
        {children}
      </Page.Content>
    )
  } else if (shape === 'tab') {
    return (
      <Page.Content>
        <Tab
          shape="wrapped"
          defaultActiveKey={defaultActiveKey}
          activeKey={activeKey}
          onChange={onChange}
        >
          {
            map(items, item => <Tab.Item key={item.key} title={item.title} />)
          }
        </Tab>
        {children}
      </Page.Content>
    )
  } else {
    console.log('debugme',123123123)
    throw new Error('[PageHeader] the shape of nav is unexpected')
  }
}

NavContext.propTypes = {
  nav: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node,
}

export default NavContext
