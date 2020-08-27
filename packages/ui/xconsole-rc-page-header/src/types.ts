import React from 'react';
import { SelectProps } from '@alicloud/console-components/lib/select';
import { History } from 'history';

export interface INavProps {
  shape: 'tab' | 'menu';
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: () => void;
  items?: any;
}

export interface IProps {
  title: string;
  subTitle: string;
  subSwitcher: SelectProps;
  breadcrumbs: {
    text: string;
    to?: string;
  }[];
  historyBack: string;
  history: History;
  extra: React.ReactNode;
  nav: INavProps;
  children: React.ReactNode;
  onBackArrowClick: () => void;
  hasBackArrow: boolean;
}
