// @ts-ignore
import intl from '@alicloud/console-components-intl';

intl.set(
  {
    locale: '',
    messages: {},
  },
  {
    determineLocale: true,
    mergeMessages: {},
  }
);

export {
  default as ConsoleUitls,
  ConsoleContext, // @ts-ignore
} from '@alicloud/xconsole-context';

export {
  default as intl,
  withProvider, // @ts-ignore
} from '@alicloud/console-components-intl';
