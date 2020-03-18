import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
export var REGION_LIST_JSONP_URL = '//fecs.console.aliyun.com/api/topbar/showRegionList';

var validResult = function validResult(result) {
  if (!result) {
    return 'Invalid response.';
  }

  var code = result.code,
      message = result.message;

  if (code !== 200 && code !== '200') {
    var invalidMessage = message || "Invalid code [".concat(code, "]");
    return invalidMessage;
  }

  return true;
};

export var getRegionList = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var ids,
        regionIds,
        queryString,
        requestUrl,
        response,
        result,
        isValidResult,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ids = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
            regionIds = ids.join(',');
            queryString = qs.stringify({
              regionIds: regionIds
            });
            requestUrl = "".concat(REGION_LIST_JSONP_URL, "?").concat(queryString);
            _context.next = 6;
            return fetchJsonp(requestUrl);

          case 6:
            response = _context.sent;
            _context.next = 9;
            return response.json();

          case 9:
            result = _context.sent;
            isValidResult = validResult(result);

            if (!(isValidResult !== true)) {
              _context.next = 13;
              break;
            }

            throw new Error(isValidResult);

          case 13:
            return _context.abrupt("return", result.data);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getRegionList() {
    return _ref.apply(this, arguments);
  };
}();