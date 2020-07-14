export var ConsoleBaseBroadcast = {
  /**
   * 展示或隐藏顶部导航
   */
  toggleTopNav: function toggleTopNav(payload) {},

  /**
   * 打开教程
   */
  launchTutorial: function launchTutorial(payload) {
    return Promise.resolve();
  },
  // ------- region ------- //

  /**
   * 展示或隐藏区域选择器
   */
  toggleRegion: function toggleRegion() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  },

  /**
   * 设置展示成「全球」或取消此设置（payload = false 的时候）
   */
  toggleRegionGlobal: function toggleRegionGlobal() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  },

  /**
   * 修改当前选中的 region id
   */
  setRegionId: function setRegionId(payload) {},

  /**
   * 动态修改可用区域
   */
  setRegions: function setRegions(payload) {},

  /**
   * 动态设置各个 region 下的资源数
   */
  setRegionResourceCount: function setRegionResourceCount(payload) {},
  // ------- resource group ------- //

  /**
   * 控制台应用：通知组件展示或隐藏
   */
  toggleResourceGroup: function toggleResourceGroup() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  },

  /**
   * 控制台应用：通知组件修改当前选择的资源组
   */
  setResourceGroupId: function setResourceGroupId(payload) {},

  /**
   * 动态设置各资源组下的资源数
   */
  setResourceGroupResourceCount: function setResourceGroupResourceCount(payload) {},
  // ------- toolkit ------- //

  /**
   * Toolkit 添加或修改一个工具
   *
   * 原 @ali/console-base-sdk-toolkit messenger.putTool
   */
  putToolkitItem: function putToolkitItem(tool) {},

  /**
   * 外部调用：移除工具
   */
  removeToolkitItem: function removeToolkitItem(id) {}
};

function onToolkitItemClick(id, fn) {
  return function () {};
} // subscriber


export var AppSubscriber = {
  /**
   * console-base 加载完成时进行回调，一般情况下不需要调用，在 @ali/console-base-messenger 中已经处理，
   * 可以保证在 ready 之前就可以跟 console-base 进行交互
   */
  onReady: function onReady(fn) {
    return function () {};
  },

  /**
   * 地域切换时的回调
   */
  onRegionChange: function onRegionChange(fn) {
    return function () {};
  },

  /**
   * 资源组数据加载完成时的回调
   */
  onResourceGroupDataLoaded: function onResourceGroupDataLoaded(fn) {
    return function () {};
  },

  /**
   * 资源组切换时的回调
   */
  onResourceGroupChange: function onResourceGroupChange(fn) {
    return function () {};
  },
  // ------- toolkit ------- //

  /**
   * 「体验新版」工具点击时的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeClickedVersionNew
   */
  onToolkitVersionNewClick: function onToolkitVersionNewClick(fn) {
    return function () {};
  },

  /**
   * 「返回旧版」工具点击时的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeClickedVersionOld
   */
  onToolkitVersionOldClick: function onToolkitVersionOldClick(fn) {
    return function () {};
  },

  /**
   * 某工具的「点击」的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeClicked
   */
  onToolkitItemClick: onToolkitItemClick,

  /**
   * 某工具的「激活」时的回调
   *
   * 原 @ali/console-base-sdk-toolkit messenger.subscribeActivated + subscribeDeactivated
   */
  onToolkitItemActiveChange: function onToolkitItemActiveChange(_ref) {
    var id = _ref.id,
        fn = _ref.fn;
    return function () {};
  },
  // ------- fastbuy ------- //
  onFastbuyClose: function onFastbuyClose(fn) {
    return function () {};
  },
  onFastbuyBuy: function onFastbuyBuy(fn) {
    return function () {};
  },
  onFastbuySubmitPayment: function onFastbuySubmitPayment(fn) {
    return function () {};
  },
  onFastbuyOrderFinish: function onFastbuyOrderFinish(fn) {
    return function () {};
  }
};