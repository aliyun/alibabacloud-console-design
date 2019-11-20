import React, { ReactNode, SyntheticEvent } from 'react';
import RoutableMenu from "@alicloud/console-components-console-menu/RoutableMenu";

interface IMenuItem {
  key?: string | number;
  label?: ReactNode;
  disabled?: boolean;
  visible?: boolean;
  render?: () => ReactNode;
}

export interface IProps {
  header?: ReactNode;
  items?: IMenuItem[];
  defaultOpenKeys?: string | number | (string | number)[];
  onItemClick?: (
    key: string | number,
    item: IMenuItem,
    e: SyntheticEvent
  ) => void;
}

const Menu = ({
  header,
  items,
  defaultOpenKeys,
  onItemClick,
}: IProps) => {
  return (
    <RoutableMenu
      header={header}
      items={items}
      defaultOpenKeys={defaultOpenKeys}
      onItemClick={onItemClick}
    />
  )
}

export default Menu