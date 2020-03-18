import createLoader from '@ali/widget-loader'

const loadWidget = createLoader()

export default ({
  id,
  version,
}, loadOptions) => {
  if (typeof id === 'undefined') {
    throw Error(
      '[WLM:loader] widget id is required'
    )
  }
  return loadWidget({ id, version }, loadOptions)
}
