import request from '@alicloud/console-widget-request'
import consoleRequestInterceptor from '@alicloud/console-request-interceptor'
import searchParamsInterceptor from '@alicloud/search-params-interceptor'
import consoleRiskInterceptor from '@alicloud/console-risk-interceptor'
import consoleResponseInterceptor from '@alicloud/console-response-interceptor'
import consoleMockInterceptor from './interceptors/consoleMockInterceptor'

// Interceptors for request
request.interceptors.request.use(searchParamsInterceptor)
request.interceptors.request.use(consoleMockInterceptor())
request.interceptors.request.use(consoleRequestInterceptor)

// Interceptors for response
request.interceptors.response.use(consoleRiskInterceptor)
request.interceptors.response.use(consoleResponseInterceptor)

export default request 