import React from 'react';
import { ConsoleConfigKeyMapping } from '../constants/console';
import { IAliyunConsoleConfig } from '../types/AliyunConsoleConfig';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    ALIYUN_CONSOLE_CONFIG: IAliyunConsoleConfig;
  }
}

export const Context = React.createContext<IConsoleConfig>({
  links: null,
  features: null,
  gray: null,
  mainAccountPK: null,
  currentPK: null,
  accountType: null,
  accountName: null,
  openStatus: null,
  locale: null,
  regions: null,
});

interface IProps {
  children: React.ReactChild;
  key: string;
}

const Provider: React.FC<IProps> = ({ children, key }: IProps) => {
  const configs = window.ALIYUN_CONSOLE_CONFIG;
  const value = {};
  Object
    .entries(ConsoleConfigKeyMapping)
    .reduce(([key, consoleKey]: [string, ]) => {
      value[key] = configs[consoleKey]
    }, {});

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

Provider.displayName = 'ConsoleBaseProvider';

export default Provider;
