import ConsoleBase from '../console/ConsoleBase';

// @ts-ignore
import Cookie from 'js-cookie';

// 默认标识
const DEFAULT_COOKIE_KEY = 'console_base_resource_group_id';

/**
 * 从 cookie 中获取当前的 region id
 * @param {String=} key
 */
export const getCurrentRGId = () => {
  return (Cookie.get(DEFAULT_COOKIE_KEY) || '-1');
};


export default {
  onResourceGroupChange: ConsoleBase.onResourceGroupChange,
  onResourceGroupDataLoaded: ConsoleBase.onResourceGroupDataLoaded,
  toggleResourceGroup: ConsoleBase.toggleResourceGroup,
  setResourceGroupId: ConsoleBase.setResourceGroupId,
  setResourceGroupResourceCount: ConsoleBase.setResourceGroupResourceCount,
  getCurrentResourceGroup: (): string => getCurrentRGId(),
};
