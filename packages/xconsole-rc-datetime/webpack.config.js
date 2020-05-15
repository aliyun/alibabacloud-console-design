const path = require('path')

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'Datetime',
    libraryTarget: 'umd',
  },
  alias: {
    '@alicloud/xconsole-rc-datetime': path.join(__dirname, 'src/index.js'),
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
    '@ali/wind-intl': {
      root: 'WindIntl',
      commonjs2: '@ali/wind-intl',
      commonjs: '@ali/wind-intl',
      amd: '@ali/wind-intl',
    },
    moment: {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment',
    },
  },
  isExtractCss: true,
}
