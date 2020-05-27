export default (message, data) => {
  const _logger = document.querySelector('#xconsole-logger');
  if (_logger) {
    _logger.innerHTML += `<div class="log-item"> ${JSON.stringify(message)} ${JSON.stringify(data)}</div>`
  }
}
