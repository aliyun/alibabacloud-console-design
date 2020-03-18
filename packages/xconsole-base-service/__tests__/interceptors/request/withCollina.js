import { axios } from '../../../src'
import withCollina from '../../../src/interceptors/request/withCollina'
import { MOCK_UA } from '../../__cons__'

const createAxiosInstance = () => axios.create({
  baseURL: 'http://mocks.alibaba-inc.com/mock/oneconsole/',
  url: '/data/api.json',
  method: 'post',
})

describe('interceptors.request.withCollina', () => {
  it('should inject `collina` to post data', (done) => {
    const service = createAxiosInstance()
    service.interceptors.request.use((config) => {
      const { data: { collina } = {} } = config
      expect(collina).toEqual(MOCK_UA)
      done()
      return config
    })
    service.interceptors.request.use(withCollina())
    service.request()
  })

  it('should inject `collina` with spec param key to post data', (done) => {
    const service = createAxiosInstance()
    service.interceptors.request.use((config) => {
      const { data: { customCollina } = {} } = config
      expect(customCollina).toEqual(MOCK_UA)
      done()
      return config
    })
    service.interceptors.request.use(withCollina({ dataKey: 'customCollina' }))
    service.request()
  })

  it('should inject `collina` with spec value to post data', (done) => {
    const service = createAxiosInstance()
    const customUA = 'custom-ua'
    service.interceptors.request.use((config) => {
      const { data: { customCollina } = {} } = config
      expect(customCollina).toEqual(customUA)
      done()
      return config
    })
    const customGetter = () => customUA
    service.interceptors.request.use(withCollina({
      dataKey: 'customCollina',
      getter: customGetter,
    }))
    service.request()
  })

  it('should not override custom data', (done) => {
    const service = createAxiosInstance()
    const customUA = 'custom-ua'
    service.interceptors.request.use((config) => {
      const { data: { collina } = {} } = config
      expect(collina).toEqual(customUA)
      done()
      return config
    })
    service.interceptors.request.use(withCollina())
    service.request({
      data: {
        collina: customUA,
      }
    })
  })
})
