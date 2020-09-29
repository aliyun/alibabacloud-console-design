import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react';
import '@alicloud/xconsole-rc-error-prompt/dist/index.css';
import '@alicloud/xconsole-rc-dialog/dist/index.css';
import '@alicloud/console-components/dist/wind.css';
import DemoBasic from './demo/basic'
import DemoRequest from './demo/request'
import DemoConfig from './demo/config'
import DemoErrorCenter from './demo/errorCenter'


storiesOf('XconsoleErrorCenter', module)
  .addDecorator(withKnobs)
  .add('Basic', () => <DemoBasic />)
  .add('Request Error', () => <DemoRequest />)
  .add('Config', () => <DemoConfig />)
  .add('ErrorCenter', () => <DemoErrorCenter />)
