import React, { useEffect, useState } from 'react';
import isFunction from 'lodash/isFunction'
import useRegion from './region/useRegion';
import ConsoleBaseMessengerRegion from '@alicloud/console-base-rc-messenger-region';
import ConsoleBaseMessengerResourceGroup from '@alicloud/console-base-rc-messenger-resource-group';
import useRcRegionProps from './region/useRcRegionProps';
import useRcResourceGroupProps from './resourceGroup/useRcResourceGroupProps';
import useResourceGroup from './resourceGroup/useResourceGroup';
import consoleConfig from './console/index';
import { IConsoleContextProp } from './types/index';
import { ConsoleContext } from './context/Context';

/**
 * 为了实现组件式阿里云吊顶交互的逻辑兼容, 目前 mobile 在使用
 * @param Comp 
 * @returns 
 */
export function withRcBaseMessenger<P extends IConsoleContextProp, S = {}>(
  Comp: new () => React.Component<P, S>
) {

  return (props: P) => {
    const regionProps = useRcRegionProps(props as any);
    const resourceGroupProps = useRcResourceGroupProps(props);

    if (regionProps.loading) return null;
    
    return (
      <>
        <ConsoleBaseMessengerRegion {...regionProps} />
        <ConsoleBaseMessengerResourceGroup {...resourceGroupProps} />
        <Comp 
          {...props}
          // 这里是为了覆盖 useRegion 中返回的 region, 取代 useRegion 中 ConsoleBase Messenger 的逻辑
          // 没办法 sb boshi 做的升级徒增工作量
          _injectRegionContextValue={regionProps.region}
          _injectResourceGroupContextValue={resourceGroupProps.resourceGroup}
        />
      </>
    );
  }
}


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
    const region = props._injectRegionContextValue ? props._injectRegionContextValue : useRegion(props)
    // 初始化 resourceGroup 逻辑
    const resourceGroup = props._injectResourceGroupContextValue ? props._injectResourceGroupContextValue : useResourceGroup(props);

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
