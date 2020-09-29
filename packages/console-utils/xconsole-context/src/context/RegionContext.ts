import { createContext } from 'react';
import { IRegionContextValue } from '../types/index';

export const RegionContext = createContext<IRegionContextValue>({
  setActiveRegionId: () => {},
  activeRegionId: undefined,
});
