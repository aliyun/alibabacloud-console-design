import axios from 'axios'
import { axios as exportAxios, service, createService } from  '../src'

const toMocks = {
  baseURL: 'http://mocks.alibaba-inc.com/mock/oneconsole/',
}

describe('wind-service', () => {
  it('should exports native axios', () => {
    expect(exportAxios).toEqual(axios)
  })
})
