import React, { createContext } from 'react';

import useRegion from './region/useRegion';
import consoleConfig from './console/index';
import { IConsoleContextProp } from './types/index';
import { ConsoleContext } from './context/Context';

function withConsoleContext<P extends IConsoleContextProp, S = {}>(
  Comp: new () => React.Component<P, S>
) {
  return (props: P) => {
    // 初始化 regionbar 逻辑
    const region = useRegion(props);

    const context = { consoleConfig, region };
    return (
      <ConsoleContext.Provider value={context}>
        <Comp {...props} />
      </ConsoleContext.Provider>
    );
  };
}

export default withConsoleContext;
