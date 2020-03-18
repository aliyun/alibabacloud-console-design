const MULTI_API_URL = '/data/multiApi.json'

export default (config) => {
  const { data: { actions } = {} } = config
  if (actions) {
    return {
      ...config,
      url: MULTI_API_URL,
    }
  }
  return config
}
