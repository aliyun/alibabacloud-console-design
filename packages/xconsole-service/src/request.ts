import axios from 'axios'
import searchParamsInterceptor from './interceptors/searchParamsInterceptor'
import consoleMockInterceptor from './interceptors/consoleMockInterceptor'
import consoleRequestInterceptor from './interceptors/consoleRequestInterceptor'
import consoleRiskInterceptor from './interceptors/consoleRiskInterceptor'
import consoleResponseInterceptor from './interceptors/consoleResponseInterceptor'

import armsRequestInterceptor from './interceptors/armsRequestInterceptor'
import armsResponseInterceptor from './interceptors/armsResponseInterceptor'


const request = axios.create()

// Interceptors for request
request.interceptors.request.use(armsRequestInterceptor)
request.interceptors.request.use(searchParamsInterceptor)
request.interceptors.request.use(consoleMockInterceptor())
request.interceptors.request.use(consoleRequestInterceptor)

// Interceptors for response
request.interceptors.response.use(armsResponseInterceptor)
request.interceptors.response.use(consoleRiskInterceptor)
request.interceptors.response.use(consoleResponseInterceptor)
console.log('debugme xconsole service')
export default request