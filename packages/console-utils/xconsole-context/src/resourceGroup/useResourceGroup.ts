import { useEffect, useState } from 'react';
import qs from 'query-string'
import { IConsoleContextProp, ResourceGroupType } from '../types/index';
import ConsoleResourceGroup, { getCurrentRGId } from '../resourceGroup/index';
import { matchPath } from 'react-router-dom';

type ResourceGroup = typeof ConsoleResourceGroup;

export default (props: IConsoleContextProp<{regionId?: string}>): ResourceGroup => {
  const { history, consoleBase, location } = props;
  const { routeType = 'query', resourceGroupVisiblePaths = [] } = props.resourceGroup || {};
  const [currentRGId, setCurrentRGId] = useState<string>(getCurrentRGId());

  const resourceGroup = {
    ...(consoleBase || ConsoleResourceGroup),
    getCurrentResourceGroup: () => currentRGId,
  };

  useEffect(() => {
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
      const query = qs.parse(loc.search)
      if (enable && routeType === ResourceGroupType.query && query.resourceGroupId === undefined) {
        const url = new URL(window.location.href);
        url.searchParams.append('resourceGroupId', currentRGId)
        history.replace({
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
        });
      }
    });

    const unsubScriber = resourceGroup.onResourceGroupDataLoaded(() => {/* */})

    const unsubScriberChange =  resourceGroup.onResourceGroupChange((payload) => {
      const url = new URL(window.location.href);

      setCurrentRGId(payload.id);
      url.searchParams.delete('resourceGroupId');
      url.searchParams.append('resourceGroupId', payload.id);

      history.push({
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      });
    })

    return () => {
      unlisten()
      unsubScriber()
      unsubScriberChange()
    }
  }, [resourceGroupVisiblePaths, location.pathname])

  return resourceGroup;
}