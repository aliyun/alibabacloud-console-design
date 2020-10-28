import {
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
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    ALIYUN_CONSOLE_CONFIG: IAliyunConsoleConfig;
  }
}

class ConsoleConfig {
  private consoleConfig: Partial<IAliyunConsoleConfig>;

  constructor() {
    this.consoleConfig = window.ALIYUN_CONSOLE_CONFIG || {};
  }

  public getChannel = (): ChannelEnum => {
    return this.consoleConfig.CHANNEL;
  };

  public getfEnv = (): fEnv => {
    return this.consoleConfig.fEnv;
  };

  public getPortalId = (): string => {
    return this.consoleConfig.PORTAL_Id;
  };

  public getLang = (): LangEnum => {
    return this.consoleConfig.LANG;
  };

  public getLocale = (): string => {
    return this.consoleConfig.LOCALE;
  };

  public getAccoutLoginLink = (): string => {
    return this.consoleConfig.ACCOUNT_LOGIN_LINK;
  };

  public getSecToken = (): string => {
    return this.consoleConfig.SEC_TOKEN;
  };

  public isCertified = (): string => {
    return this.consoleConfig.IS_CERTIFIED;
  };

  public getAccountName = (): string => {
    return this.consoleConfig.ACCOUNT_NAME;
  };

  public getMainAccountPK = (): string => {
    return this.consoleConfig.MAIN_ACCOUNT_PK;
  };

  public getCurrentPK = (): string => {
    return this.consoleConfig.CURRENT_PK;
  };

  public getAccountType = (): AccountType => {
    return this.consoleConfig.ACCOUNT_TYPE;
  };

  public getOpenStatus = (productId: string): IOpenStatus => {
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

  public getGrayStatus = (featureId: string): boolean => {
    if (
      this.consoleConfig.FEATURE_STATUS &&
      this.consoleConfig.FEATURE_STATUS[featureId]
    ) {
      return this.consoleConfig.FEATURE_STATUS[featureId];
    }
    return false;
  };

  public getChannelFeature = (featureId: string): IChannelStatus => {
    if (
      this.consoleConfig.CHANNEL_FEATURE_STATUS &&
      this.consoleConfig.CHANNEL_FEATURE_STATUS[featureId]
    ) {
      return this.consoleConfig.CHANNEL_FEATURE_STATUS[featureId];
    }
    return { status: false };
  };

  public getChannelLink = (linkId: string): string => {
    if (
      this.consoleConfig.CHANNEL_LINKS &&
      this.consoleConfig.CHANNEL_LINKS[linkId]
    ) {
      return this.consoleConfig.CHANNEL_LINKS[linkId];
    }
    return 'javascript:void(0)';
  };

  public getLabel = (): ILabel => {
    return this.consoleConfig.LABELS;
  };

  public getUserPreference = (): ILabel => {
    return this.consoleConfig.USER_PREFERENCE;
  };

  public getRuleConfig = (ruleId: string): string | undefined => {
    if (
      this.consoleConfig.RULE_CONFIG &&
      this.consoleConfig.RULE_CONFIG[ruleId]
    ) {
      return this.consoleConfig.RULE_CONFIG[ruleId];
    }
    return undefined;
  };

  public getRegions = (): IRegion[] => {
    return this.consoleConfig.REGIONS;
  };

  public getStaticAPI = <T = any>(field: string): T | undefined => {
    if (this.consoleConfig.STATIC_API && this.consoleConfig.STATIC_API[field]) {
      return this.consoleConfig.STATIC_API[field] as T;
    }
    return undefined;
  };
}

export default ConsoleConfig;
