import { createContext } from 'react';

import type { IRegionContextValue } from '../types/index';

export const RegionContext = createContext<IRegionContextValue>({
  setActiveRegionId: () => { /* void */ },
  activeRegionId: undefined,
});
