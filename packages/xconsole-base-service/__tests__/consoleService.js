import adapter from 'axios/lib/adapters/http'
import {
  dropOriginResponse,
  getOriginResponse,
} from '../src/interceptors/response/extractData'
import { service, axios, createDefaultAxiosInstance } from  '../src'

const CustomHeaders = {
  AUTHOR: {
    key: 'X-Author',
    value: 'macroxing',
  },
}

const config = {
  adapter,
  baseURL: 'https://mocks.alibaba-inc.com/mock/oneconsole/',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    [CustomHeaders.AUTHOR.key]: CustomHeaders.AUTHOR.value,
  },
  transformRequest: [
    /**
     * 在 node 环境下需要将 URLSearchParams 进行序列化
     * @param {Object} data
     */
    function transformRequestOnNodeEnvironment(data) {
      return data.toString()
    },
  ],
}

const mockId = +new Date()

const data = {
  action: 'UnitTest',
  product: 'wind-demo',
  params: {
    id: mockId,
  },
}

const responseData = {
  'string': 'This is a string value',
  'number': 10,
  'boolean': true,
  'array': [
    0,
    1,
    2,
    3,
    4,
    5
  ],
  'object': {
    'string': 'This is a string value',
    'number': 10,
    'boolean': true,
    'array': [
      0,
      1,
      2,
      3,
      4,
      5
    ]
  }
}

const alterToken = +new Date()
const alterTokenHeaderKey = 'X-Alter-Token'

const addHeader = (config) => ({
  ...config,
  headers: {
    ...(config.headers || {}),
    [alterTokenHeaderKey]: alterToken,
  },
})

describe('service(data: object, config?: object): Promise', () => {
  it('should request to spec api and response exact data', (done) => {
    service(data, config).then((result) => {
      expect(dropOriginResponse(result)).toEqual(responseData)
      done()
    }).catch((err) => {
      throw err
    })
  })

  it('should request to spec api with custom config', (done) => {
    service(data, addHeader(config)).then((result) => {
      const { config: { headers } = {} } = getOriginResponse(result)
      expect(headers[alterTokenHeaderKey]).toEqual(alterToken)
      expect(headers[CustomHeaders.AUTHOR.key]).toEqual(CustomHeaders.AUTHOR.value)
      done()
    }).catch((err) => {
      throw err
    })
  })

  it('should apply specific axios instance if configuration `getAxiosInstance` is setted', (done) => {
    const newAxiosInstance = createDefaultAxiosInstance(config)
    newAxiosInstance.interceptors.request.use(addHeader)
    service(data, { axiosInstance: newAxiosInstance }).then((result) => {
      expect(dropOriginResponse(result)).toEqual(responseData)
      const { config: { headers } = {} } = getOriginResponse(result)
      expect(headers[alterTokenHeaderKey]).toEqual(alterToken)

      service(data, config).then((result) => {
        expect(dropOriginResponse(result)).toEqual(responseData)
        const { config: { headers } = {} } = getOriginResponse(result)
        expect(headers[alterTokenHeaderKey]).toBeUndefined()
        done()
      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      throw err
    })
  })
})

describe('service.alterAxiosInstance(alternation: function): void', () => {
  it('should apply alternative axios instance', (done) => {
    service.alterAxiosInstance((ins) => {
      ins.interceptors.request.use(addHeader)
      return ins
    })
    service(data, config).then((result) => {
      expect(dropOriginResponse(result)).toEqual(responseData)
      const { config: { headers } = {} } = getOriginResponse(result)
      expect(headers[alterTokenHeaderKey]).toEqual(alterToken)

      service(data, config).then((result) => {
        expect(dropOriginResponse(result)).toEqual(responseData)
        const { config: { headers } = {} } = getOriginResponse(result)
        expect(headers[alterTokenHeaderKey]).toEqual(alterToken)
        done()
      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      throw err
    })
  })

  it('should reset axios instance as basement if passing arguments\'s length is 0', () => {
    service.alterAxiosInstance()
    service(data, config).then((result) => {
      expect(dropOriginResponse(result)).toEqual(responseData)
      const { config: { headers } = {} } = getOriginResponse(result)
      expect(headers[alterTokenHeaderKey]).toBeUndefined()
      done()
    }).catch((err) => {
      throw err
    })
  })
})
