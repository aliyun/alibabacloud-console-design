import React, { useEffect, useState, useRef } from 'react';
import isFunction from 'lodash/isFunction'
import { matchPath } from 'react-router-dom';

import useRegion from './region/useRegion';
import ConsoleBaseMessengerRegion from '@alicloud/console-base-rc-messenger-region';
import ConsoleBaseMessengerResourceGroup from '@alicloud/console-base-rc-messenger-resource-group';
import useRcRegionProps from './region/useRcRegionProps';
import useRcResourceGroupProps from './resourceGroup/useRcResourceGroupProps';
import useResourceGroup from './resourceGroup/useResourceGroup';
import consoleConfig from './console/index';
import { IConsoleContextProp } from './types/index';
import { ConsoleContext } from './context/Context';
import { IPayloadRegion } from './types/ConsoleBase';

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

interface IWin {
  APLUS_CONFIG: {
    spmbPrefix?: string;
  };
}

/**
 * 生成 spm 上报的 hash code
 */
function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

function matchCustomPath(patterns?: string[], path?: string) {
  return patterns?.find((pattern) => matchPath(path, {
    path: pattern,
    exact: false,
    strict: false,
  }));
}

/**
 * 为了实现异步的逻辑
 */
function withAsyncRegionList<P extends IConsoleContextProp, S = {}>(
  Comp: new () => React.Component<P, S>
) {
  return (props: P) => {
    const { region: { regionList: userRegionListConfig } = {}, location, match, history, appConfig } = props;
    const [loading, setLoading] = useState(isFunction(userRegionListConfig));
    const [regionList, setRegionList] = useState(isFunction(userRegionListConfig) ? [] : userRegionListConfig as IPayloadRegion[]);
    const lastMatchUrl = useRef('');

    const { customPaths = [] } = appConfig.aplus || {};

    useEffect(() => {
      (async () => {
        if (isFunction(userRegionListConfig)) {
          setLoading(true);
          const regionList = await (userRegionListConfig as (location: Location) => Promise<IPayloadRegion[]>)(props.location);
          setRegionList(regionList);
          setLoading(false);
        }
      })();
    }, [location.pathname]);

    // 自动上报 spmB
    useEffect(() => {
      const aplusConfig = (window as unknown as IWin).APLUS_CONFIG || {};

      if (lastMatchUrl.current === history.location.pathname) return;
      lastMatchUrl.current = history.location.pathname;

      const { spmbPrefix } = aplusConfig;

      const matchPath = match.isExact ? match.path : matchCustomPath(customPaths, history.location.pathname) || match.path;

      if (spmbPrefix) {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/camelcase
        const q = (window.aplus_queue || (window.aplus_queue = []));
        // 设置页面的spmab
        // 由于 aplus 不是实时发送，存在时延，故需要特殊处理重定向场景
        ((url) => {
          setTimeout(() => {
            // url 不等，说明发生了重定向或者用户快速的跳转
            if (url === window.location.href) {
              // 延迟发送
              q.push({
                'action':'aplus.setPageSPM',
                'arguments':['5176',`${spmbPrefix}_${hashCode(matchPath)}`]
              });

              q.push({
                'action':'aplus.sendPV',
                'arguments':[{
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  is_auto: false
                }, {
                  c1: matchPath
                }]
              });
            }
          }, 0);
        })(window.location.href);
      }
    }, [match, history]);

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
