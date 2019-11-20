module.exports = (api) => {
  api.registerCommand('test',{

  }, () => {

    api.dispatch('generate', { type: 'XConsole' })
      
  })
}