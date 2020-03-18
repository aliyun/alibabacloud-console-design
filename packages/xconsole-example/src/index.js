import { mount } from '@alicloud/console-os-react-portal';
import './.xconsole/initializer';
import App from './.xconsole/app';

export default mount(
  App,
  document.getElementById('app'),
  'console-workbench'
);

