import { useEffect } from 'react';
import { IConsoleContextProp, ResourceGroupType } from '../types/index';
import ConsoleResourceGroup from '../resourceGroup/index';

type ResourceGroup = typeof ConsoleResourceGroup;

export default (props: IConsoleContextProp<{regionId?: string}>): ResourceGroup => {
  const { history, consoleBase } = props;
  const { enable, routeType } = props.resourceGroup || {};

  const resourceGroup = {
    ...(consoleBase || ConsoleResourceGroup),
  };

  useEffect(() => {
    // toggle the resource group show or hide by resourceGroup.enable
    resourceGroup.toggleResourceGroup(enable);

    // add presistents for resource group
    const unlisten = history.listen((location) => {
      if (routeType === ResourceGroupType.query) {
        const url = new URL(window.location.href);
        url.searchParams.append('resourceGroupId', 'test1')
        history.push(url.toString())
      }
    });

    const unsubScriber = resourceGroup.onResourceGroupDataLoaded(() => {})

    const unsubScriberChange =  resourceGroup.onResourceGroupChange((payload) => {
      const url = new URL(window.location.href);
      // @ts-ignore
      url.searchParams.append('resourceGroupId', payload.id);

      history.push({
        pathname: location.pathname,
        search: location.search,
        hash: url.hash,
      });
    })

    return () => {
      unlisten()
      unsubScriber()
      unsubScriberChange()
    }
  }, [enable])

  return {
    ...ConsoleResourceGroup,
    ...props.consoleBase,
  }
}