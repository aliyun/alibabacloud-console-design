import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from '../paramsInterceptor/index';
import RiskDialog from './dialog';
import {
  guideToVerificationMethodSetting,
  guideToVerificationDetailSetting,
} from './helpers';
import { IResponse, IResponseData, Risk } from '../../types';

export interface IVerifyOptions {
  isVerifyCodeValid: boolean;
  verifyType: string;
  verifyDetail: any;
  codeType: string;
  lastRequestId: string | number;
  risk: IResponse['config']['risk'];
}

const axiosInstance = axios.create();

function isVerifyCodeValid(
  res: AxiosResponse | null,
  code: Risk['code'] = {}
): boolean {
  return !(res && res.data && res.data.code === code.verifyCodeInvalid);
}

async function handleDoubleConfirm(
  response: IResponse<IResponseData>
): Promise<AxiosResponse> {
  const {
    config: { risk = {} },
  } = response;
  const { code } = risk;
  const { data: responseData } = response;
  const { data: riskData } = responseData;
  const { verifyType, verifyDetail, codeType } = riskData;

  if (!verifyType) {
    guideToVerificationMethodSetting(verifyType, risk);
    return response;
  }

  if (!verifyDetail && (verifyType === 'sms' || verifyType === 'email')) {
    guideToVerificationDetailSetting(verifyType, risk);
    return response;
  }

  let newResponse: AxiosResponse | null = null;
  let lastRequestId;
  /* eslint-disable no-await-in-loop */
  while (newResponse === null || !isVerifyCodeValid(newResponse, code)) {
    let requestId;
    let verifyCode;

    const options: any = {
      isVerifyCodeValid: isVerifyCodeValid(newResponse, code),
      verifyType,
      verifyDetail,
      codeType,
      requestId: lastRequestId,
      riskConfig: risk,
    };
    try {
      const { reqId, vCode } = await RiskDialog.show(options);
      requestId = reqId;
      verifyCode = vCode;
      lastRequestId = requestId;
    } catch (e) {
      console.error('[getVerifyInformation] failed: ', e.message);
      throw e;
    }

    try {
      const {
        config: { data: reqDataString, url: reqUrl },
      } = response;
      const reqData = new URLSearchParams(reqDataString);
      reqData.append('verifyType', verifyType);
      if (verifyCode) reqData.append('verifyCode', verifyCode);
      if (requestId) reqData.append('requestId', requestId);

      newResponse = await axiosInstance({
        method: 'post',
        url: reqUrl,
        baseURL: '/',
        data: reqData,
      });
    } catch (e) {
      console.error('[verify Request] failed: ', e.message);
      throw e;
    }
  }

  return newResponse;
}

export default handleDoubleConfirm;
