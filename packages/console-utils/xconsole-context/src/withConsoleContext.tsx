import React, { useEffect, useState } from 'react';
import isFunction from 'lodash/isFunction'
import useRegion from './region/useRegion';
import useResourceGroup from './resourceGroup/useResourceGroup';
import consoleConfig from './console/index';
import { IConsoleContextProp } from './types/index';
import { ConsoleContext } from './context/Context';

/**
 * 为了实现异步的逻辑
 */
function withAsyncRegionList<P extends IConsoleContextProp, S = {}>(
  Comp: new () => React.Component<P, S>
) {
  return (props: P) => {
    const { region: { regionList: userRegionListConfig } = {}, location } = props;
    const [loading, setLoading] = useState(isFunction(userRegionListConfig));
    const [regionList, setRegionList] = useState(isFunction(userRegionListConfig) ? [] : userRegionListConfig);

    useEffect(() => {
      (async () => {
        if (isFunction(userRegionListConfig)) {
          setLoading(true);
          const regionList = await userRegionListConfig(props.location);
          setRegionList(regionList);
          setLoading(false);
        }
      })();
    }, [location.pathname]);

    return loading ? null : (
      <Comp 
        {...props} 
        region={{
          ...props.region,
          regionList,
        }}
      />);
  }
}

const ConsoleContextComponent = withAsyncRegionList(
  // @ts-ignore
  (props: P) => {
    // 初始化 regionbar 逻辑
    const region = useRegion(props)
    // 初始化 resourceGroup 逻辑
    const resourceGroup = useResourceGroup(props);

    const context = { consoleConfig, region, resourceGroup };

    const Comp = props.comp;

    return (
      <ConsoleContext.Provider value={context}>
        <Comp {...props} />
      </ConsoleContext.Provider>
    );
  }
);

function withConsoleContext<P extends IConsoleContextProp, S = {}>(
  Comp: new () => React.Component<P, S>
) {
  // @ts-ignore
  return (props) => <ConsoleContextComponent {...props} comp={Comp} />
}

export default withConsoleContext;
