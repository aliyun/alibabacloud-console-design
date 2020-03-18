const path = require('path')

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'Info',
    libraryTarget: 'umd',
  },
  alias: {
    '@ali/wind-rc-info': path.join(__dirname, 'src/index.js'),
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
    '@ali/wind/lib/grid': {
      root: 'Wind_Grid',
      commonjs2: '@ali/wind/lib/grid',
      commonjs: '@ali/wind/lib/grid',
      amd: '@ali/wind/lib/grid',
    },
    '@ali/wind/lib/icon': {
      root: 'Wind_Icon',
      commonjs2: '@ali/wind/lib/icon',
      commonjs: '@ali/wind/lib/icon',
      amd: '@ali/wind/lib/icon',
    },
  },
  isExtractCss: true,
}
