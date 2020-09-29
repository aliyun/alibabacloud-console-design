import React from 'react';

export interface RouteItem {
  path: string;
  component: React.FunctionComponent;
  layout: React.FunctionComponent | null;
  config: any;
}

export interface RouteConfig {
  global: {
    hasUIConfig: boolean;
    hasWidgetLoader: boolean;
    hasEntryCode: boolean;
    hasAppConfig: boolean;
    hasLayout: boolean;
    indexRoute: string;
    prefix?: string;
    mode: 'browser' | 'hash';
    appId: string;
    redirect: string;
  };
  routes: RouteItem[];
}
