import createLoader from '@ali/widget-loader';
var loadWidget = createLoader();
export default (function (_ref, loadOptions) {
  var id = _ref.id,
      version = _ref.version;

  if (typeof id === 'undefined') {
    throw Error('[WLM:loader] widget id is required');
  }

  return loadWidget({
    id: id,
    version: version
  }, loadOptions);
});