import React from 'react';
import { Dialog } from '@alicloud/console-components';
import messages from './messages';
import { Risk } from '../../types';

function gotoSetVerificationMethod(verifyUrl: any): void {
  window.open(verifyUrl.bindMobileHelp, '_blank');
}

function confirmSettingFinish(
  verifyMessages: any,
  verifyUrl: Risk['url']
): void {
  Dialog.confirm({
    title: verifyMessages.setTitle,
    content: verifyMessages.doneTip,
    locale: {
      ok: verifyMessages.doneSet,
      cancel: verifyMessages.gotProblem,
    },
    onCancel: () => {
      gotoSetVerificationMethod(verifyUrl);
    },
    needWrapper: false,
  });
}

export function guideToVerificationMethodSetting(
  verifyType: string,
  risk: Risk = {}
): void {
  const { url: verifyUrl } = risk;
  const verifyMessages = {
    ...messages[verifyType],
    ...messages.others,
  };
  Dialog.confirm({
    title: verifyMessages.setTitle,
    onOk: () => {
      gotoSetVerificationMethod(verifyUrl);
      confirmSettingFinish(verifyMessages, verifyUrl);
    },
    content: <div>{verifyMessages.setTip}</div>,
    locale: {
      ok: verifyMessages.goSet,
      cancel: verifyMessages.cancel,
    },
    footerActions: ['ok'],
    needWrapper: false,
  });
}

export function guideToVerificationDetailSetting(
  verifyType: string,
  risk: Risk = {}
): void {
  const { url: verifyUrl } = risk;
  const verifyMessages = {
    ...messages[verifyType],
    ...messages.others,
  };
  Dialog.confirm({
    title: verifyMessages.title,
    content: verifyMessages.bindDescription,
    onOk: () => {
      gotoSetVerificationMethod(verifyUrl);
      confirmSettingFinish(verifyMessages, verifyUrl);
    },
    locale: {
      ok: verifyMessages.goSet,
      cancel: verifyMessages.cancel,
    },
    footerActions: ['ok'],
    needWrapper: false,
  });
}
