import WindProProvider from '../src/index'

describe('WindProProvider #main', () => {
  it('exports in correct type', () => {
    [WindProProvider].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
