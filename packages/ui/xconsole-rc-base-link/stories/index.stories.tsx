import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Link from '../src/index'
import '@alicloud/console-components/dist/xconsole.css';
import '../src/index.less'

storiesOf('XconsoleRcLink', module).add('XconsoleRcLink', () => {
  return (
    <div id="app-wrapper">
      <Link>xxxxx</Link>
    </div>
  );
});
