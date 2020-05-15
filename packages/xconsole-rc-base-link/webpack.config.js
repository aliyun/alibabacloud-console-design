const path = require('path')

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'Link',
    libraryTarget: 'umd',
  },
  alias: {
    '@alicloud/xconsole-rc-base-link': path.join(__dirname, 'src/index.js'),
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
    dva: {
      root: 'dva',
      commonjs2: 'dva',
      commonjs: 'dva',
      amd: 'dva',
    },
    'dva/router': {
      root: 'dva_router',
      commonjs2: 'dva/router',
      commonjs: 'dva/router',
      amd: 'dva/router',
    },
  },
  isExtractCss: true,
}
