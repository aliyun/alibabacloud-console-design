import React, { ReactNode } from 'react';
import { SelectProps } from '@alifd/next/lib/select';
import { History } from 'history';

export interface INavProps {
  shape: 'tab' | 'menu' | string;
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (value: string) => void;
  items?: any;
  defaultOpenKeys?: string[];
}

interface IBreadcrumbItem extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  link?: string;
  to?: string;
}


export interface IProps {
  title: ReactNode;
  titleExtra?: ReactNode;
  titleExtraAlign?: 'left' | 'right';
  subTitle?: string;
  subSwitcher?: SelectProps;
  breadcrumbs?: IBreadcrumbItem[];
  historyBack?: string;
  history?: History;
  extra?: ReactNode;
  nav?: INavProps;
  children?: ReactNode;
  onBackArrowClick?: () => void;
  hasBackArrow?: boolean;
}
