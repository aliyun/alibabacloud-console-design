import { useEffect, useState } from 'react';
import { History } from 'history'
import qs from 'query-string'
import { IConsoleContextProp } from '../types/index';
import ConsoleResourceGroup, { getCurrentRGId } from '../resourceGroup/index';
import { matchPath } from 'react-router-dom';

const reroute = (history: History, currentRGId: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete('resourceGroupId');
  if (currentRGId) url.searchParams.append('resourceGroupId', currentRGId);
  history.replace({
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
  });
}

export default (props: IConsoleContextProp<{regionId?: string}>) => {
  const { history, consoleBase, location } = props;
  const { resourceGroupVisiblePaths = [] } = props.resourceGroup || {};
  const searchParam = qs.parse(location.search);
  const [currentRGId, setCurrentRGId] = useState<string>(
    searchParam.resourceGroupId || getCurrentRGId()
  );

  const enable = resourceGroupVisiblePaths.some((showRegionPath) => {
    const matches = matchPath(location.pathname, {
      path: showRegionPath,
      exact: true,
      strict: true,
    });
    return !!matches
  });

  const onChange = (id: string) => {
    const url = new URL(window.location.href);

    if (!id) {
      setCurrentRGId('');
      url.searchParams.delete('resourceGroupId');
      url.searchParams.append('resourceGroupId', '');
    } else {
      setCurrentRGId(id);
      url.searchParams.delete('resourceGroupId');
      url.searchParams.append('resourceGroupId', id);
    }

    history.push({
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
    });
  }

  useEffect(() => {
    // 初次进入页面
<<<<<<< HEAD
    if (currentRGId) reroute(currentRGId, currentRGId)
=======
    if (currentRGId) reroute(history, currentRGId)
>>>>>>> master
  }, []);

  useEffect(() => {
    // add presistents for resource group
    const unlisten = history.listen((loc) => {
      const query = qs.parse(loc.search);
      if (enable && query.resourceGroupId === undefined) {
        reroute(history, currentRGId);
      } else if (!enable && query.resourceGroupId !== undefined) {
        reroute(history, undefined);
      }
    });

    return () => {
      unlisten();
    };
  }, [
    enable,
    history,
    currentRGId,
  ]);

  return {
    onChange,
    visible: enable,
    resourceGroupId: currentRGId,
    resourceGroup: {
      ...(consoleBase || ConsoleResourceGroup),
      getCurrentResourceGroup: () => currentRGId,
    }
  };
};
