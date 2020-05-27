export default (function (message, data) {
  var _logger = document.querySelector('#xconsole-logger');

  if (_logger) {
    _logger.innerHTML += "<div class=\"log-item\"> ".concat(JSON.stringify(message), " ").concat(JSON.stringify(data), "</div>");
  }
});