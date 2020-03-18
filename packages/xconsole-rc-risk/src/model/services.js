/* eslint-disable import/prefer-default-export */
import { axios } from '@ali/wind-service'
import withCollina from '@ali/wind-service/lib/interceptors/request/withCollina'
// eslint-disable-next-line max-len
import withSecToken from '@ali/wind-service/lib/interceptors/request/withSecToken'
import withUmid from '@ali/wind-service/lib/interceptors/request/withUmid'
// eslint-disable-next-line max-len
import withTransformRequest from '@ali/wind-service/lib/interceptors/request/withTransformRequest'
// eslint-disable-next-line max-len
import validStatus from '@ali/wind-service/lib/interceptors/response/validStatus'
import validData from '@ali/wind-service/lib/interceptors/response/validData'

const service = axios.create({
  url: '/risk/sendVerifyMessage.json',
  method: 'POST',
})

const extractData = response => response.data

service.interceptors.request.use(withUmid())
service.interceptors.request.use(withSecToken())
service.interceptors.request.use(withCollina())
service.interceptors.request.use(withTransformRequest())

service.interceptors.response.use(validStatus)
service.interceptors.response.use(validData)
service.interceptors.response.use(extractData)

export const sendCode = data => service({
  data,
})
