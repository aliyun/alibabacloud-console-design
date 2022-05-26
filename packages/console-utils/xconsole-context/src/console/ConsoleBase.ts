import {
  IPayloadLaunchTutorial,
  IPayloadRegion,
  TResourceCountMapping,
  IToolkitItem,
  IPayloadFastbuy,
  IPayloadResourceGroup,
  IPayloadRegionOnChange,
} from '../types/ConsoleBase';

export const ConsoleBaseBroadcast = {
  /**
   * 展示或隐藏顶部导航
   */
  toggleTopNav(payload: boolean): void {/* void */},

  // ------- region ------- //

  /**
   * 展示或隐藏区域选择器
   */
  toggleRegion(payload = true): void {/* void */},

  /**
   * 设置展示成「全球」或取消此设置（payload = false 的时候）
   */
  toggleRegionGlobal(payload = true): void {/* void */},

  /**
   * 修改当前选中的 region id
   */
  setRegionId(payload: string): void {/* void */},

  /**
   * 动态修改可用区域
   */
  setRegions(payload: IPayloadRegion[]): void {/* void */},

  /**
   * 动态设置各个 region 下的资源数
   */
  setRegionResourceCount(payload: TResourceCountMapping): void {/* void */},

  // ------- resource group ------- //

  /**
   * 控制台应用：通知组件展示或隐藏
   */
  toggleResourceGroup(payload = true): void {/* void */},

  /**
   * 控制台应用：通知组件修改当前选择的资源组
   */
  setResourceGroupId(payload: string): void {/* void */},

  /**
   * 动态设置各资源组下的资源数
   */
  setResourceGroupResourceCount(payload: TResourceCountMapping): void {/* void */},

  // ------- toolkit ------- //
  /**
   * Toolkit 添加或修改一个工具
   *
   * 原 @ali/console-base-sdk-toolkit messenger.putTool
   */
  putToolkitItem(tool: IToolkitItem): void {/* void */},

  /**
   * 外部调用：移除工具
   */
  removeToolkitItem(id: string): void {/* void */},
};

function onToolkitItemClick(id: string, fn: () => void): () => void {
  return () => {/* void */};
}

// subscriber
export const ConsoleSubscriber = {
  /**
   * console-base 加载完成时进行回调，一般情况下不需要调用，在 @ali/console-base-messenger 中已经处理，
   * 可以保证在 ready 之前就可以跟 console-base 进行交互
   */
  onReady(fn: () => void): () => void {
    return () => {/* void */};
  },

  /**
   * 地域切换时的回调
   */
  onRegionChange(fn: (payload: IPayloadRegionOnChange) => void): () => void {
    return () => {/* void */};
  },

  /**
   * 资源组数据加载完成时的回调
   */
  onResourceGroupDataLoaded(
    fn: (payload: IPayloadResourceGroup[]) => void
  ): () => void {
    return () => {/* void */};
  },

  /**
   * 资源组切换时的回调
   */
  onResourceGroupChange(
    fn: (payload: IPayloadResourceGroup | null) => void
  ): () => void {
    return () => {/* void */};
  },

  // ------- toolkit ------- //

  /**
   * 「体验新版」工具点击时的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeClickedVersionNew
   */
  onToolkitVersionNewClick(fn: () => void): () => void {
    return () => {/* void */};
  },

  /**
   * 「返回旧版」工具点击时的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeClickedVersionOld
   */
  onToolkitVersionOldClick(fn: () => void): () => void {
    return () => {/* void */};
  },

  /**
   * 某工具的「点击」的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeClicked
   */
  onToolkitItemClick,

  /**
   * 某工具的「激活」时的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeActivated + subscribeDeactivated
   */
  onToolkitItemActiveChange(id: string, fn: (active: boolean) => void): () => void {
    return () => {/* void */};
  },

  // ------- fastbuy ------- //
  onFastbuyClose(fn: (payload: IPayloadFastbuy) => void): () => void {
    return () => {/* void */};
  },

  onFastbuyBuy(fn: (payload: IPayloadFastbuy) => void): () => void {
    return () => {/* void */};
  },

  onFastbuySubmitPayment(fn: (payload: IPayloadFastbuy) => void): () => void {
    return () => {/* void */};
  },

  onFastbuyOrderFinish(fn: (payload: IPayloadFastbuy) => void): () => void {
    return () => {/* void */};
  },
};

export default {
  ...ConsoleBaseBroadcast,
  ...ConsoleSubscriber,
};


export const updateConsoleBase = () => {
  /* void */
}