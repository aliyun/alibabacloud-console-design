import createRequest from '../request';
import { IOptions, IResponseData } from '../types';
import { DownloadSignatureParam, DownloadSignatureResponse, OssSignatureParam, OssSignatureResponse } from './types';

const SIGNATURE_API_URL = "/tool/oss/generateUploadSignature.json";
const DOWNLOAD_SIGNATURE_API_URL = "/tool/oss/generateDownloadUrl.json";

/**
 * OneConsole oss 获取上传签名
 */
export const genOssUploadSignature = async (params: OssSignatureParam, opt: IOptions = {}) => {
  const request = createRequest();
  const resp = await request.request<IResponseData<OssSignatureResponse>>({
    url: SIGNATURE_API_URL,
    data: params,
    method: 'post',
    ...opt,
  })
  return resp.data?.data;
}


/**
 * OneConsole oss 获取下载签名
 */
export const genOssDownloadSignature = async (params: DownloadSignatureParam, opt: IOptions = {}) => {
  const request = createRequest();
  const resp = await request.request<IResponseData<DownloadSignatureResponse>>({
    url: DOWNLOAD_SIGNATURE_API_URL,
    method: 'post',
    data:params,
    ...opt,
  });
  return resp.data?.data;
}