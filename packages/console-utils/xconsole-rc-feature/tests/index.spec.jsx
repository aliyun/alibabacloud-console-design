import WindProRcFeature from '../src/index'

describe('WindProRcFeature #main', () => {
  it('exports in correct type', () => {
    [WindProRcFeature].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
