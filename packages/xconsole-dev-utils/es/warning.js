/* eslint-disable import/no-mutable-exports */
import { isProduction } from './env';

var warning = function warning() {}; // Just warning on dev environment


if (!isProduction()) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0; // eslint-disable-next-line no-plusplus

    var message = "Warning: ".concat(format.replace(/%s/g, function () {
      return args[argIndex++];
    }));

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      throw new Error(message);
    } catch (x) {} // eslint-disable-line no-empty

  };

  warning = function warning(condition, format) {
    if (typeof format === 'undefined') {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(void 0, [format].concat(args));
    }
  };
}

export default warning;