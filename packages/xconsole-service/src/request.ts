import axios from 'axios'
import searchParamsInterceptor from './interceptors/searchParamsInterceptor'
import consoleMockInterceptor from './interceptors/consoleMockInterceptor'
import consoleRequestInterceptor from './interceptors/consoleRequestInterceptor'
import consoleRiskInterceptor from './interceptors/consoleRiskInterceptor'
import consoleResponseInterceptor from './interceptors/consoleResponseInterceptor'

const request = axios.create()

// Interceptors for request
request.interceptors.request.use(searchParamsInterceptor)
request.interceptors.request.use(consoleMockInterceptor())
request.interceptors.request.use(consoleRequestInterceptor)

// Interceptors for response
request.interceptors.response.use(consoleRiskInterceptor)
request.interceptors.response.use(consoleResponseInterceptor)

export default request 