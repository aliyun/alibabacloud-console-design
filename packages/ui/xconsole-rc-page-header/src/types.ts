import React from 'react';
import { SelectProps } from '@alicloud/console-components/lib/select';
import { History } from 'history';

export interface IProps {
  title: string;
  subTitle: string;
  subSwitcher: SelectProps;
  breadcrumbs: {
    title: string;
    text: string;
    to: string;
  }[];
  historyBack: string;
  history: History;
  extra: React.ReactNode;
  nav: {
    // 导航标题
    title: string;
    // 导航 key
    key: string;
  }[];
  children: React.ReactNode;
  onBackArrowClick: () => void;
  hasBackArrow: boolean;
}
