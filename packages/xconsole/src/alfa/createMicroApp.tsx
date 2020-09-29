import React from 'react';
import Application from '@alicloud/console-os-react-app';

type ApplicationProps = React.ComponentProps<typeof Application>;

interface AppConfig {
  id: string;
  manifest: string;
}

export default (config: AppConfig) => (props: ApplicationProps) => (
  <Application
    id={config.id}
    manifest={config.manifest}
    {...props}
  />
)
