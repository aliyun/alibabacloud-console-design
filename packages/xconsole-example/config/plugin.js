module.exports = (api) => {
  api.on('onChainWebpack', (config) => {
    config.entryPoints.delete('index')
    config.entry('index').add('./index')
  })
};
