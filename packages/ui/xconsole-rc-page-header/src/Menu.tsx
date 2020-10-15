import React from 'react';
import map from 'lodash.map';
import Page from '@alicloud/console-components-page';

import { INavProps } from './types';

interface IProps {
  nav: INavProps;
}

const Menu: React.FC<IProps> = ({
  nav: { defaultActiveKey, activeKey, onChange, items },
}: IProps) => {
  return (
    // @ts-ignore
    <Page.Menu
      // @ts-ignore
      onItemClick={onChange}
      defaultSelectedKeys={defaultActiveKey}
      selectedKeys={activeKey}
    >
      {map(items, (item) => (
        <Page.Menu.Item key={item.key}>{item.title}</Page.Menu.Item>
      ))}
    </Page.Menu>
  );
};

export default Menu;
