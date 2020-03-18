import * as XConsoleRcRegion from '@alicloud/xconsole-rc-region'
import intl from '@alicloud/console-components-intl'

intl.set({
  locale: '',
  messages: {},
}, {
  determineLocale: true,
  mergeMessages: {},
});

export { default as ErrorCenter, ErrorPrompt } from '@alicloud/xconsole-error-center';
export { default as Query } from '@alicloud/xconsole-query';
export { default as Mutation } from '@alicloud/xconsole-mutation';
export * from '@alicloud/xconsole-model'
export * from '@alicloud/xconsole-service';
export * from '@alicloud/xconsole-context';
export { default as ConsoleUI } from '@ali/console-ui';
export { default as intl, withProvider } from '@alicloud/console-components-intl'
export { default as Table } from '@alicloud/console-components-table';
export { default as Actions, LinkButton } from '@alicloud/console-components-actions';
export { default as StatusIndicator } from '@alicloud/console-components-status-indicator';

export { default as DataFields } from '@alicloud/console-components-data-fields';

export { default as DateTime } from '@alicloud/xconsole-rc-datetime';

export { default as Form } from '@alicloud/xconsole-rc-form';
export { default as Link } from '@alicloud/xconsole-rc-link';
export { default as Gray } from '@alicloud/xconsole-rc-gray';
export { default as Widget } from '@alicloud/xconsole-rc-widget';
export { default as Result } from '@alicloud/xconsole-rc-result';
export { default as Feature } from '@alicloud/xconsole-rc-feature';
export { default as AppLayout } from '@alicloud/xconsole-rc-app-layout';
export { default as PageHeader } from '@alicloud/xconsole-rc-page-header';
export { default as Description } from '@alicloud/xconsole-rc-description';
export { RegionContext } from '@alicloud/xconsole-region-context';

export {
  withNavCollapsed,
  AppLayoutContext,
} from '@alicloud/xconsole-rc-app-layout'

export const RcRegion = XConsoleRcRegion;





