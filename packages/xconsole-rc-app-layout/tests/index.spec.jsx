import WindProRcAppLayout from '../src/index'

describe('WindProRcAppLayout #main', () => {
  it('exports in correct type', () => {
    [WindProRcAppLayout].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
