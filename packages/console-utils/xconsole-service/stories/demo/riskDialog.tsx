import { useEffect } from 'react';
import Dialog from '../../src/interceptors/riskInterceptor/dialog';


export default () => {
  useEffect(() => {
    Dialog.show({
      codeType: "ims_user_delete",
      mteeCode: "aliyun_console",
      verifyDetail: "180****5420",
      verifyType: "sms",
      isVerifyCodeValid: true,
      riskConfig: {
        code: {
          success: '200',
          doubleConfirm: 'FoundRiskAndDoubleConfirm',
          forbidden: 'FoundRiskAndTip',
          verifyCodeInvalid: 'verifyCodeInvalid',
        },
        url: {
          generateVerificationCode: '/risk/sendVerifyMessage.json',
          setVerificationMethod: 'https://account.console.aliyun.com/#/secure',
          changeVerificationMethod: 'https://account.console.aliyun.com/#/secure',
          bindMobileHelp: 'https://account.console.aliyun.com',
        },
      },
    })
  }, [])
  return null;
}