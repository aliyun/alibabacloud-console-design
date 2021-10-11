import { IProps as FormProps } from './form';
import { DialogProps } from '@alifd/next/lib/dialog';

export interface IVerifyInfo {
  reqId?: string;
  vCode?: string;
}

export interface RiskUrlOption {
  generateVerificationCode: string;
  setVerificationMethod: string;
  changeVerificationMethod: string;
  bindMobileHelp: string;
}

export interface RiskOption {
  code: {
    success: string;
    doubleConfirm: string;
    forbidden: string;
    verifyCodeInvalid: string;
  };
  url: RiskUrlOption;
}

export interface RiskDialogOptions {
  requestId?: string;
  // 风控码
  codeType: string;
  //
  mteeCode: "aliyun_console";
  // 验证详情提示
  verifyDetail: string;
  // 风控类型
  verifyType: "sms" | 'ga' | 'mfa';

  // 是否为正确的风控错误码
  isVerifyCodeValid: boolean;

  // Risk 的配置
  riskConfig: RiskOption;
}

export interface RiskDialogProps extends DialogProps {
  onConfirm: ({ verifyCode, requestId }) => void;
  formProps?: FormProps;
}