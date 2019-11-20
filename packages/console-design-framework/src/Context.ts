import React, {
  useContext,
  createContext,
} from 'react';

export interface IProviderValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  visible: boolean;
}

const Context = createContext<IProviderValue>(null);

export const useAppMenu = (): IProviderValue => {
  const {
    collapsed,
    setCollapsed,
    visible,
  } = useContext(Context);

  return {
    collapsed,
    setCollapsed,
    visible,
  }
}

export default Context