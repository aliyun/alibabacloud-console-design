import template from 'lodash/template';

import type {
  ChannelEnum,
  IAliyunConsoleConfig,
  fEnv,
  LangEnum,
  AccountType,
  IOpenStatus,
  IChannelStatus,
  ILabel,
  IRegion,
} from '../types/AliyunConsoleConfig';

declare global {
  interface Window {
    ALIYUN_CONSOLE_CONFIG: IAliyunConsoleConfig;
  }
}

class ConsoleConfig {
  private consoleConfig: Partial<IAliyunConsoleConfig>;

  constructor() {
    this.consoleConfig = window.ALIYUN_CONSOLE_CONFIG || {};
  }

  getChannel = (): ChannelEnum => {
    return this.consoleConfig.CHANNEL;
  };

  getfEnv = (): fEnv => {
    return this.consoleConfig.fEnv;
  };

  getPortalId = (): string => {
    return this.consoleConfig.PORTAL_Id;
  };

  getLang = (): LangEnum => {
    return this.consoleConfig.LANG;
  };

  getLocale = (): string => {
    return this.consoleConfig.LOCALE;
  };

  getAccoutLoginLink = (): string => {
    return this.consoleConfig.ACCOUNT_LOGIN_LINK;
  };

  getSecToken = (): string => {
    return this.consoleConfig.SEC_TOKEN;
  };

  isCertified = (): boolean => {
    return this.consoleConfig.IS_CERTIFIED === 'true';
  };

  getAccountName = (): string => {
    return this.consoleConfig.ACCOUNT_NAME;
  };

  getMainAccountPK = (): string => {
    return this.consoleConfig.MAIN_ACCOUNT_PK;
  };

  getCurrentPK = (): string => {
    return this.consoleConfig.CURRENT_PK;
  };

  getAccountType = (): AccountType => {
    return this.consoleConfig.ACCOUNT_TYPE;
  };

  getOpenStatus = (productId: string): IOpenStatus => {
    if (
      this.consoleConfig.OPEN_STATUS &&
      this.consoleConfig.OPEN_STATUS[productId]
    ) {
      return this.consoleConfig.OPEN_STATUS[productId];
    }
    return {
      enabled: 'false',
    };
  };

  getGrayStatus = (featureId: string): boolean => {
    if (
      this.consoleConfig.FEATURE_STATUS &&
      this.consoleConfig.FEATURE_STATUS[featureId]
    ) {
      return this.consoleConfig.FEATURE_STATUS[featureId];
    }
    return false;
  };

  getChannelFeature = (featureId: string): IChannelStatus => {
    if (
      this.consoleConfig.CHANNEL_FEATURE_STATUS &&
      this.consoleConfig.CHANNEL_FEATURE_STATUS[featureId]
    ) {
      return this.consoleConfig.CHANNEL_FEATURE_STATUS[featureId];
    }
    return { status: false };
  };

  getChannelLink = (linkId: string, linkParams?: any): string => {
    // eslint-disable-next-line no-script-url
    let channelLink = 'javascript:void(0)';
    if (
      this.consoleConfig.CHANNEL_LINKS &&
      this.consoleConfig.CHANNEL_LINKS[linkId]
    ) {
      channelLink = this.consoleConfig.CHANNEL_LINKS[linkId];
    }

    if (linkParams) {
      channelLink = template(channelLink)(linkParams);
    }

    return channelLink;
  };

  getLabel = (): ILabel => {
    return this.consoleConfig.LABELS;
  };

  getUserPreference = (): ILabel => {
    return this.consoleConfig.USER_PREFERENCE;
  };

  getRuleConfig = (ruleId: string): string | undefined => {
    if (
      this.consoleConfig.RULE_CONFIG &&
      this.consoleConfig.RULE_CONFIG[ruleId]
    ) {
      return this.consoleConfig.RULE_CONFIG[ruleId];
    }
    return undefined;
  };

  getRegions = (): IRegion[] => {
    return this.consoleConfig.REGIONS;
  };

  getStaticAPI = <T = any>(field: string): T | undefined => {
    if (this.consoleConfig.STATIC_API && this.consoleConfig.STATIC_API[field]) {
      return this.consoleConfig.STATIC_API[field] as T;
    }
    return undefined;
  };
}

export default ConsoleConfig;
