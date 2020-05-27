import WindProConsoleBaseContext from '../src/index'

describe('WindProConsoleBaseContext #main', () => {
  it('exports in correct type', () => {
    [WindProConsoleBaseContext].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
