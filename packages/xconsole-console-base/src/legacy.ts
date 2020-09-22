import {
  subscribeRegionbarDidMount,
  subscribeConsoleRegionChange,
  sendRegionList,
} from './messenger'

export const handleLegacyRegion = (regionList: any, history: any) => {
  // subscribe regionbar mount event
  const unsubscribeMount = subscribeRegionbarDidMount(() => {
    sendRegionList(regionList);
  })
  // subscribe regionbar change event
  const unsubscribeChange = subscribeConsoleRegionChange((payload: any) => {
    const { fromRegionId, toRegionId } = payload;
    fromRegionId && toRegionId && history.push(
      window.location.pathname.replace(fromRegionId, toRegionId)
    );
  })
  sendRegionList(regionList);

  return () => {
    unsubscribeMount()
    unsubscribeChange()
  };
}