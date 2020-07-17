import React from 'react';
import { Dialog } from '@alicloud/console-components';
import Form from './form';
import messages from './messages';

export interface IVerifyInfo {
  reqId?: string;
  vCode?: string;
}

function getVerifyInformation(options: any): Promise<IVerifyInfo> {
  return new Promise<IVerifyInfo>((resolve, reject) => {
    // eslint-disable-next-line prefer-const
    let { lastRequestId: requestId, risk, ...rest } = options;
    let verifyCode: any;

    function setRequestId(val: any): void {
      requestId = val;
    }
    function setVerifyCode(val: string): void {
      verifyCode = val;
    }

    const { verifyType } = options;
    const { title } = messages[verifyType];

    try {
      Dialog.confirm({
        // 弹出对话框
        title,
        content: (
          <Form
            options={rest}
            setRequestId={setRequestId}
            setVerifyCode={setVerifyCode}
            onError={reject}
            risk={risk}
          />
        ),
        onOk: () => {
          if (verifyType === 'ga' && verifyCode) {
            return resolve({ vCode: verifyCode });
          }
          if (requestId && verifyCode) {
            return resolve({
              reqId: requestId,
              vCode: verifyCode,
            });
          }
          console.warn(
            // eslint-disable-line no-console
            '[getVerifyInformation] failed: ',
            requestId,
            verifyCode
          );

          return false;
        },
        onCancel: () => {
          reject(new Error('Verification has been canceled!'));
        },
        onClose: () => {
          reject(new Error('Verification has been canceled!'));
        },
        needWrapper: false,
      });
    } catch (e) {
      console.log('[getVerifyInformation] failed: ', e);
      reject(e);
    }
  });
}

export default getVerifyInformation;
