import { useEffect, useState } from 'react';
import { matchPath } from 'react-router-dom';
import qs from 'query-string';

import ConsoleResourceGroup, { getCurrentRGId } from '../resourceGroup/index';
import type { IConsoleContextProp } from '../types/index';

export type ResourceGroup = typeof ConsoleResourceGroup;

/**
 * 为了兼容 hashRouter 和 historyRouter，不要直接使用 window.location
 */
export default (props: IConsoleContextProp<{regionId?: string}>): ResourceGroup => {
  const { history, consoleBase, location } = props;
  const { resourceGroupVisiblePaths = [], disable = false } = props.resourceGroup || {};
  // hashRouter 中，无法通过 window.location.search 获取到 query，必须通过 history.location.search 获取
  const searchParam = qs.parse(location.search);
  const [currentRGId, setCurrentRGId] = useState<string>(
    searchParam.resourceGroupId as string || getCurrentRGId(),
  );

  const resourceGroup = {
    ...(consoleBase || ConsoleResourceGroup),
    getCurrentResourceGroup: () => currentRGId,
  };

  useEffect(() => {
    if (currentRGId && !disable) {
      resourceGroup.setResourceGroupId(currentRGId);
    }
  });

  useEffect(() => {
    if (disable) {
      resourceGroup.toggleResourceGroup(false);
      return;
    }

    // 根据实时的 location.pathname 判断是否资源组是否开启
    const isEnable = () => {
      let enable = false;

      resourceGroupVisiblePaths.forEach((path) => {
        // history is always latest
        const matches = matchPath(history.location.pathname, {
          path,
          exact: true,
          strict: true,
        });

        if (matches) {
          enable = true;
        }
      });

      return enable;
    };

    resourceGroup.toggleResourceGroup(isEnable());

    // add presistents for resource group
    const unlisten = history.listen((loc) => {
      if (!isEnable()) return;

      const url = new URL(loc.pathname + loc.search + loc.hash, window.location.origin);
      if (!url.searchParams.get('resourceGroupId') && currentRGId) {
        url.searchParams.delete('resourceGroupId');
        url.searchParams.append('resourceGroupId', currentRGId);

        history.replace({
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
        }, history.location.state);
      }
    });

    const unSubscriber = resourceGroup.onResourceGroupDataLoaded(() => {
      /* */
    });

    const unSubscriberChange = resourceGroup.onResourceGroupChange(
      (payload) => {
        if (!isEnable()) return;

        const url = new URL(location.pathname + location.search + location.hash, window.location.origin);

        if (payload?.id) {
          setCurrentRGId(payload.id);
          url.searchParams.delete('resourceGroupId');
          url.searchParams.append('resourceGroupId', payload.id);
        } else {
          setCurrentRGId('');
          url.searchParams.delete('resourceGroupId');
        }

        history.push({
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
        }, history.location.state);
      },
    );

    return () => {
      unlisten();
      unSubscriber();
      unSubscriberChange();
    };
  }, [resourceGroupVisiblePaths, location.pathname, resourceGroup, history, currentRGId, disable, location.search, location.hash]);

  return resourceGroup;
};
