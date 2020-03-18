import warning from '@ali/wind-dev-utils/lib/warning'
import axios from './axios'
import withRegion from './interceptors/request/withRegion'
import withTransformRequest from './interceptors/request/withTransformRequest'
import withCollina from './interceptors/request/withCollina'
import withSecToken from './interceptors/request/withSecToken'
import withUmid from './interceptors/request/withUmid'
import multiApi from './interceptors/request/multiApi'
import validStatus from './interceptors/response/validStatus'
import validData from './interceptors/response/validData'
import extractData from './interceptors/response/extractData'

const createDefaultAxiosInstance = (instanceConfig = {}) => {
  const API_URL = '/data/api.json'

  const baseService = axios.create({
    url: API_URL,
    method: 'post',
    ...instanceConfig,
  })

  baseService.interceptors.request.use(multiApi)
  baseService.interceptors.request.use(withUmid())
  baseService.interceptors.request.use(withSecToken())
  baseService.interceptors.request.use(withCollina())
  baseService.interceptors.request.use(withRegion())
  baseService.interceptors.request.use(withTransformRequest())

  baseService.interceptors.response.use(validStatus)
  baseService.interceptors.response.use(validData)
  baseService.interceptors.response.use(extractData)

  return baseService
}

const AXIOS_INSTANCE_REF = Symbol('AXIOS_INSTANCE_REF')

const service = async function (data = {}, config = {}) {
  const {
    ignoreError,
    data: configData = {},
    params: configParams = {},
    axiosInstance,
    ...restConfig
  } = config
  const { action } = data
  const serviceConfig = {
    ...restConfig,
    data: {
      ...configData,
      ...data,
    },
    params: {
      action,
      ...configParams,
    },
  }

  try {
    // 缓存 axios 实例
    if (!service[AXIOS_INSTANCE_REF]) {
      service[AXIOS_INSTANCE_REF] = createDefaultAxiosInstance()
    }
    const ins = axiosInstance || service[AXIOS_INSTANCE_REF]
    return await ins.request(serviceConfig)
  } catch (err) {
    if (!ignoreError) {
      throw err
    } else {
      warning(false, `${err.message}\n${err.stack}`)
    }
  }
}

service.alterAxiosInstance = (alternation) => {
  if (typeof alternation === 'function') {
    const ins = service[AXIOS_INSTANCE_REF] ?
      service[AXIOS_INSTANCE_REF] : createDefaultAxiosInstance()
    service[AXIOS_INSTANCE_REF] = alternation(ins)
  } else {
    service[AXIOS_INSTANCE_REF] = createDefaultAxiosInstance()
  }
}

export {
  createDefaultAxiosInstance,
  AXIOS_INSTANCE_REF,
  service,
}

export const createService = (product, action, transformConfig) =>
  (params, config = {}) => service({
    action,
    product,
    params,
  }, transformConfig ? transformConfig(config) : config)


// OneConsole Upload
// 在 OneConsole 体系内的上传文件使用 OSS Open API, 获取签名后利用返回的数据进行后续的上传操作
// TODO: 后续 OneConsole 的定制化接口可能进一步丰富起来, 需要将不同的接口进行模块化分割
const UPLOAD_SIGNATURE_API = '/tool/oss/generateUploadSignature.json'
const GET_DOWNLOAD_URL_API = '/tool/oss/generateDownloadUrl.json'

const uploadService = axios.create({
  url: UPLOAD_SIGNATURE_API,
  method: 'post',
})

uploadService.interceptors.request.use(withSecToken())
uploadService.interceptors.request.use(withTransformRequest())

uploadService.interceptors.response.use(validStatus)
uploadService.interceptors.response.use(validData)
uploadService.interceptors.response.use(extractData)

// eslint-disable-next-line max-len
const generateOssApi = url => async function (bucketName, region, objectName, options = {}) {
  if (typeof bucketName !== 'string') {
    throw new TypeError('bucketName should be a string')
  }
  if (typeof objectName !== 'string') {
    throw new TypeError('objectName should be a string')
  }
  if (typeof region !== 'string') {
    throw new TypeError('region should be a string')
  }

  const {
    extra = {},
    ignoreError = false,
  } = options

  try {
    return await uploadService.request({
      url,
      data: {
        bucketName,
        objectName,
        region,
      },
      ...extra,
    })
  } catch (err) {
    if (!ignoreError) {
      throw err
    } else {
      warning(false, `${err.message}\n${err.stack}`)
    }
  }
}

export const getUploadSignature = generateOssApi(UPLOAD_SIGNATURE_API)

export const getDownloadUrl = generateOssApi(GET_DOWNLOAD_URL_API)
