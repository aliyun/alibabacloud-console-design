import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";

var ConsoleConfig = function ConsoleConfig() {
  var _this = this;

  _classCallCheck(this, ConsoleConfig);

  this.getChannel = function () {
    return _this.consoleConfig.CHANNEL;
  };

  this.getfEnv = function () {
    return _this.consoleConfig.fEnv;
  };

  this.getPortalId = function () {
    return _this.consoleConfig.PORTAL_Id;
  };

  this.getLang = function () {
    return _this.consoleConfig.LANG;
  };

  this.getLocale = function () {
    return _this.consoleConfig.LOCALE;
  };

  this.getAccoutLoginLink = function () {
    return _this.consoleConfig.ACCOUNT_LOGIN_LINK;
  };

  this.getSecToken = function () {
    return _this.consoleConfig.SEC_TOKEN;
  };

  this.isCertified = function () {
    return _this.consoleConfig.IS_CERTIFIED;
  };

  this.getAccountName = function () {
    return _this.consoleConfig.ACCOUNT_NAME;
  };

  this.getMainAccountPK = function () {
    return _this.consoleConfig.MAIN_ACCOUNT_PK;
  };

  this.getCurrentPK = function () {
    return _this.consoleConfig.CURRENT_PK;
  };

  this.getAccountType = function () {
    return _this.consoleConfig.ACCOUNT_TYPE;
  };

  this.getOpenStatus = function (productId) {
    if (_this.consoleConfig.OPEN_STATUS && _this.consoleConfig.OPEN_STATUS[productId]) {
      return _this.consoleConfig.OPEN_STATUS[productId];
    }

    return {
      enabled: 'false'
    };
  };

  this.getGrayStatus = function (featureId) {
    if (_this.consoleConfig.FEATURE_STATUS && _this.consoleConfig.FEATURE_STATUS[featureId]) {
      return _this.consoleConfig.FEATURE_STATUS[featureId];
    }

    return false;
  };

  this.getChannelFeature = function (featureId) {
    if (_this.consoleConfig.CHANNEL_FEATURE_STATUS && _this.consoleConfig.CHANNEL_FEATURE_STATUS[featureId]) {
      return _this.consoleConfig.CHANNEL_FEATURE_STATUS[featureId];
    }

    return {
      status: false
    };
  };

  this.getChannelLink = function (linkId) {
    if (_this.consoleConfig.CHANNEL_LINKS && _this.consoleConfig.CHANNEL_LINKS[linkId]) {
      return _this.consoleConfig.CHANNEL_LINKS[linkId];
    }

    return '#';
  };

  this.getLabel = function () {
    return _this.consoleConfig.LABELS;
  };

  this.getUserPreference = function () {
    return _this.consoleConfig.USER_PREFERENCE;
  };

  this.getRuleConfig = function (ruleId) {
    if (_this.consoleConfig.RULE_CONFIG && _this.consoleConfig.RULE_CONFIG[ruleId]) {
      return _this.consoleConfig.RULE_CONFIG[ruleId];
    }

    return undefined;
  };

  this.getRegions = function () {
    return _this.consoleConfig.REGIONS;
  };

  this.getStaticAPI = function (field) {
    if (_this.consoleConfig.STATIC_API && _this.consoleConfig.STATIC_API[field]) {
      return _this.consoleConfig.STATIC_API[field];
    }

    return undefined;
  };

  this.consoleConfig = window.ALIYUN_CONSOLE_CONFIG || {};
};

export default ConsoleConfig;