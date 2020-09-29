import WindProRcPageHeader from '../src/index'

describe('WindProRcPageHeader #main', () => {
  it('exports in correct type', () => {
    [WindProRcPageHeader].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
