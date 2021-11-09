export interface OssSignatureParam {
  bucketName?: string;
  region?: string;
  objectName: string;
}

export interface OssSignatureResponse {
  url: string;
  bucketName: string;
  key: string;
  policy: string;
  Signature: string;
  OSSAccessKeyId: string;
}

export interface OssUploadParam {
  bucketName: string;
  key: string;
  policy: string;
  Signature: string;
  OSSAccessKeyId: string;
  file: File;
}

export interface UploadParam {
  bucketName?: string;
  objectName: string;
  region?: string;
  file: File;
}


export interface DownloadSignatureParam {
  bucketName?: string;
  region?: string;
  objectName: string;
  timeout?: number;
}

export type DownloadSignatureResponse = string;