import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import getVerifyInformation from './getVerifyInformation';
import {
  guideToVerificationMethodSetting,
  guideToVerificationDetailSetting,
} from './helpers';
import { IResponse, IResponseData, Risk } from '../../types';
import paramsInterceptor from '../paramsInterceptor/index'

export interface IVerifyOptions {
  isVerifyCodeValid: boolean;
  verifyType: string;
  verifyDetail: any;
  codeType: string;
  lastRequestId: string | number;
  risk: IResponse['config']['risk'];
}

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(paramsInterceptor)

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
      lastRequestId,
      risk,
    };
    try {
      const { reqId, vCode } = await getVerifyInformation(options);
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
      const reqData = qs.parse(reqDataString)
      reqData['verifyType'] = verifyType;
      if (verifyCode) reqData['verifyCode'] = verifyCode;
      if (requestId) reqData['requestId'] = requestId;

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
