import { useEffect, useState } from 'react';
import qs from 'query-string'
import { IConsoleContextProp } from '../types/index';
import ConsoleResourceGroup, { getCurrentRGId } from '../resourceGroup/index';
import { matchPath } from 'react-router-dom';

type ResourceGroup = typeof ConsoleResourceGroup;

export default (props: IConsoleContextProp<{regionId?: string}>): ResourceGroup => {
  const { history, consoleBase, location } = props;
  const { resourceGroupVisiblePaths = [], disable = false } = props.resourceGroup || {};
  const searchParam = qs.parse(location.search);
  const [currentRGId, setCurrentRGId] = useState<string>(
    searchParam.resourceGroupId as string || getCurrentRGId()
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
    if (disable) return;
    // toggle the resource group show or hide by resourceGroup.enable
    let enable = false;
    resourceGroup.toggleResourceGroup(enable);
    resourceGroupVisiblePaths.forEach((showRegionPath) => {
      const matches = matchPath(location.pathname, {
        path: showRegionPath,
        exact: true,
        strict: true,
      });
      if (matches) {
        resourceGroup.toggleResourceGroup(true);
        enable = true;
      }
    });

    // add presistents for resource group
    const unlisten = history.listen((loc) => {
      const query = qs.parse(loc.search);
      if (enable && query.resourceGroupId === undefined) {
        const url = new URL(window.location.href);
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
        const url = new URL(window.location.href);

        if (!payload) {
          setCurrentRGId('');
          url.searchParams.delete('resourceGroupId');
          // url.searchParams.append('resourceGroupId', '');
        } else {
          setCurrentRGId(payload.id);
          url.searchParams.delete('resourceGroupId');
          url.searchParams.append('resourceGroupId', payload.id);
        }

        history.push({
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
        }, history.location.state);
      }
    );

    return () => {
      unlisten();
      unSubscriber();
      unSubscriberChange();
    };
  }, [
    resourceGroupVisiblePaths,
    location.pathname,
    resourceGroup,
    history,
    currentRGId,
  ]);

  return resourceGroup;
};
