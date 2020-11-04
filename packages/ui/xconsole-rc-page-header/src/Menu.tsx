import React from 'react';
import map from 'lodash.map';
import Page from '@alicloud/console-components-page';

import { INavProps } from './types';

interface IProps {
  nav: INavProps;
}

const Menu: React.FC<IProps> = ({
  nav: { defaultActiveKey, defaultOpenKeys, activeKey, onChange, items, ...reset },
}: IProps) => {
  return (
    // @ts-ignore
    <Page.Menu
      // @ts-ignore
      onItemClick={onChange}
      defaultSelectedKeys={defaultActiveKey}
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={activeKey}
      {...reset}
    >
      {map(items, (item) => {
        if (item.items) {
          return (
            <Page.Menu.SubMenu key={item.key} label={item.title}>
              {item.items.map(subItem => {
                return <Page.Menu.Item key={subItem.key}>{subItem.title}</Page.Menu.Item>;
              })}
            </Page.Menu.SubMenu>
          )
        } else {
          return <Page.Menu.Item key={item.key} title={item.title}>{item.title}</Page.Menu.Item>;
        }
      }
      )}
    </Page.Menu>
  );
};

export default Menu;
