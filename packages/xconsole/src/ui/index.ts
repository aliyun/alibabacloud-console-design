export * from '@alicloud/console-components';

export { default as Page } from './rc-page/index';
export { default as PageHeader, PageProps } from './rc-page/index';

export { default as Table } from '@alicloud/console-components-table';
export { default as DataFields } from '@alicloud/console-components-data-fields';
export { default as Actions, LinkButton } from '@alicloud/console-components-actions';
export { default as StatusIndicator } from '@alicloud/console-components-status-indicator';
export { default as SlidePanel, SlidePanelGroup, SlidePanelItem } from '@alicloud/console-components-slide-panel'

// TODO: XConsole 组件需要被移动到 Console Component 的部分
export { ChannelLink as Link } from '@alicloud/xconsole-context';
export { default as Result } from '@alicloud/xconsole-rc-result';
export { default as DateTime } from '@alicloud/xconsole-rc-datetime';
export { default as Description } from '@alicloud/xconsole-rc-description';
export {  default as AppLayout, AppLayoutContext } from '@alicloud/xconsole-rc-app-layout';
