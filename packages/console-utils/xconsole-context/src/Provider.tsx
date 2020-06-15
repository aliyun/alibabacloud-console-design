import React from 'react';
import { History } from 'history';
import { ModelProvider } from '@alicloud/xconsole-model';
import { RegionProvider } from '@alicloud/xconsole-region-context';
import { ConsoleBaseProvider } from '@alicloud/xconsole-console-base-context';

import Context from './Context';

interface IProps {
  app: any;
  history: History;
  children: React.ReactChild;
}

const Provider: React.FC<IProps> = ({ app, history, children }: IProps) => {
  const value = {
    app,
    history,
  };

  return (
    <Context.Provider value={value}>
      <ConsoleBaseProvider>
        <RegionProvider history={history}>
          <ModelProvider app={app}>{children}</ModelProvider>
        </RegionProvider>
      </ConsoleBaseProvider>
    </Context.Provider>
  );
};

Provider.displayName = 'WindProProvider';

export default Provider;
