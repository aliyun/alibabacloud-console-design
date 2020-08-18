import intl from '@alicloud/console-components-intl';

intl.set(
  {
    locale: '',
    messages: {},
  },
  {
    // @ts-ignore
    determineLocale: true,
    // @ts-ignore
    mergeMessages: {},
  }
);

export {
  default as ConsoleUitls,
  ConsoleContext
} from '@alicloud/xconsole-context';

export {
  default as intl,
  withProvider
} from '@alicloud/console-components-intl';
