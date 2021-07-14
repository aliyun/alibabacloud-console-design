import * as React from 'react';
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react';
import '@alicloud/xconsole-rc-error-prompt/dist/index.css';
import '@alicloud/xconsole-rc-dialog/dist/index.css';
import '@alicloud/console-components/dist/wind.css';
import DemoBasic from './demo2/basic'
import DemoConfig from './demo2/config'
import DemoRequest from './demo2/request'


storiesOf('XconsoleErrorPrompt2', module)
  .addDecorator(withKnobs)
  .add('Basic', () => <DemoBasic />)
  .add('Config', () => <DemoConfig />)
  .add('Request Error', () => <DemoRequest />)