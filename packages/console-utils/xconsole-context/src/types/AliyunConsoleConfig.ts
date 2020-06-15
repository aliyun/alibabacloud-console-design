interface IChannelStatus {
  [key: string]: {
    status: boolean;
    attribute: { regions: string[] } | undefined;
  };
}

interface IChannelLinks {
  [key: string]: string;
}

interface ILabel {
  [key: string]: any[];
}

interface IOpenStatusMap {
  [key: string]: IOpenStatus;
}

interface IRegion {
  name: string;
  physicalList: { id: string }[];
  regionId: string;
  zoneList: {
    name: string;
    zoneId: string;
  }[];
}

interface IOpenStatus {
  enabled: 'true' | 'false';
}

interface IGrayStatus {
  [key: string]: boolean;
}

export interface IAliyunConsoleConfig {
  /**
   * 渠道信息
   */
  CHANNEL: 'CN' | 'INTL' | 'JP' | string;
  /**
   * 当前运行环境
   */
  fEnv?: 'daily' | 'pre';

  /**
   * 当前运行环境
   */
  PORTAL_Id: string;
  /**
   * 当前语言
   */
  LANG: 'en' | 'zh' | 'ja';
  /**
   * 当前国际化地域信息
   */
  LOCALE: 'zh-CN';
  /**
   * 登录地址
   */
  ACCOUNT_LOGIN_LINK: string;
  /**
   * 是否实名认证
   */
  IS_CERTIFIED: 'true' | 'false';
  /**
   * CSRF的TOKEN
   */
  SEC_TOKEN: string;
  /**
   * 子账号名称
   */
  ACCOUNT_NAME: string;
  /**
   * 主账号 ID
   */
  MAIN_ACCOUNT_PK: string;
  /**
   * 当前账号 ID
   */
  CURRENT_PK: string;
  /**
   * 账号类型
   */
  ACCOUNT_TYPE: 'main' | 'sub' | 'sts';
  /**
   * 渠道开关
   */
  CHANNEL_FEATURE_STATUS: IChannelStatus;
  /**
   * 渠道链接
   */
  CHANNEL_LINKS: IChannelLinks;
  /**
   * 云产品开通状态
   */
  OPEN_STATUS: IOpenStatusMap;
  /**
   * 功能灰度
   */
  FEATURE_STATUS: IGrayStatus;
  /**
   * 用户标签， 配置SeriesName地址
   */
  LABELS: ILabel;
  /**
   * Location 信息
   */
  REGIONS: IRegion[];
  /**
   * 规则中心配置
   */
  RULE_CONFIG: Record<string, any>;
  /**
   * 默认页面输出API调用
   */
  STATIC_API: Record<string, any>;

  REGION_BAR_SETTING: {};
  /**
   * 用户偏好设置
   */
  USER_PREFERENCE: Record<string, any>;

  /**
   * 空字符串'',证明用户从来没设置过
   * 'true', 证明用户选择了新版
   * 'false' 证明用户选择了旧版
   */
  NEW_VERSION: '' | 'true' | 'false';
}
