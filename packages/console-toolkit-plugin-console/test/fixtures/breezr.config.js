const path = require('path');

module.exports = {
  plugins: [
    require.resolve('@ali/breezr-plugin-generator'),
    path.resolve(__dirname, './plugin.js'),
    '../../lib/index.js',
  ]
}