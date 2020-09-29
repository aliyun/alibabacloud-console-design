import React from 'react';
import { Tab } from '@alicloud/console-components';
import map from 'lodash.map';
import { INavProps } from './types';

interface IProps {
  nav: INavProps;
  children: React.ReactChild;
}

const NavContext: React.FC<IProps> = ({
  nav: { shape = 'tab', defaultActiveKey, activeKey, onChange, items },
  children,
}: IProps) => {
  return (
    <>
      <Tab
        shape="wrapped"
        defaultActiveKey={defaultActiveKey}
        activeKey={activeKey}
        onChange={onChange}
      >
        {map(items, (item) => (
          <Tab.Item key={item.key} title={item.title} />
        ))}
      </Tab>
      {children}
    </>
  );
};

export default NavContext;
