import WindProRcGray from '../src/index'

describe('WindProRcGray #main', () => {
  it('exports in correct type', () => {
    [WindProRcGray].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
