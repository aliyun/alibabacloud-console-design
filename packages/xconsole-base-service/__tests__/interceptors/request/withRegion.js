import Cookie from 'js-cookie'
import { axios } from '../../../src'
import withRegion from '../../../src/interceptors/request/withRegion'

const createAxiosInstance = () => axios.create({
  baseURL: 'http://mocks.alibaba-inc.com/mock/oneconsole/',
  url: '/data/api.json',
  method: 'post',
})

const mockRegion = 'cn-hangzhou'

jest.mock('js-cookie')
Cookie.get.mockReturnValue(mockRegion)

describe('interceptors.request.withRegion', () => {
  it('should inject `region` to post data', (done) => {
    const service = createAxiosInstance()
    service.interceptors.request.use((config) => {
      const { data: { region } = {} } = config
      expect(region).toEqual(mockRegion)
      done()
      return config
    })
    service.interceptors.request.use(withRegion())
    service.request()
  })

  it('should inject `region` with spec param key to post data', (done) => {
    const service = createAxiosInstance()
    service.interceptors.request.use((config) => {
      const { data: { customRegionId } = {} } = config
      expect(customRegionId).toEqual(mockRegion)
      done()
      return config
    })
    service.interceptors.request.use(withRegion({ dataKey: 'customRegionId' }))
    service.request()
  })

  it('should inject `region` with spec value to post data', (done) => {
    const service = createAxiosInstance()
    const customId = 'custom-region-id'
    service.interceptors.request.use((config) => {
      const { data: { customRegionId } = {} } = config
      expect(customRegionId).toEqual(customId)
      done()
      return config
    })
    const customGetter = () => customId
    service.interceptors.request.use(withRegion({
      dataKey: 'customRegionId',
      getter: customGetter,
    }))
    service.request()
  })

  it('should not override custom data', (done) => {
    const service = createAxiosInstance()
    const customId = 'custom-region-id'
    service.interceptors.request.use((config) => {
      const { data: { region } = {} } = config
      expect(region).toEqual(customId)
      done()
      return config
    })
    service.interceptors.request.use(withRegion())
    service.request({
      data: {
        region: customId,
      }
    })
  })
})
