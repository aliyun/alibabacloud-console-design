import WindProRegionContext from '../src/index'

describe('WindProRegionContext #main', () => {
  it('exports in correct type', () => {
    [WindProRegionContext].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
