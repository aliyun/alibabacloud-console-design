import React from 'react';
import { SelectProps } from '@alifd/next/lib/select';
import { History } from 'history';

export interface INavProps {
  shape: 'tab' | 'menu';
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
  title: string;
  subTitle?: string;
  subSwitcher?: SelectProps;
  breadcrumbs?: IBreadcrumbItem[];
  historyBack?: string;
  history?: History;
  extra?: React.ReactNode;
  nav?: INavProps;
  children?: React.ReactNode;
  onBackArrowClick?: () => void;
  hasBackArrow?: boolean;
}
