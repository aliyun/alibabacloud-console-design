import fetchJsonp from 'fetch-jsonp'
import qs from 'qs'

export const REGION_LIST_JSONP_URL =
  '//fecs.console.aliyun.com/api/topbar/showRegionList'

const validResult = (result) => {
  if (!result) {
    return 'Invalid response.'
  }

  const { code, message } = result
  if (code !== 200 && code !== '200') {
    const invalidMessage = message || `Invalid code [${code}]`
    return invalidMessage
  }

  return true
}

export const getRegionList = async (ids = []) => {
  const regionIds = ids.join(',')
  const queryString = qs.stringify({ regionIds })
  const requestUrl = `${REGION_LIST_JSONP_URL}?${queryString}`
  const response = await fetchJsonp(requestUrl)
  const result = await response.json()
  const isValidResult = validResult(result)

  if (isValidResult !== true) {
    throw new Error(isValidResult)
  }

  return result.data
}
