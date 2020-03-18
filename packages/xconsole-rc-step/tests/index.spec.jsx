import XconsoleStep from '../src/index'

describe('XconsoleStep #main', () => {
  it('exports in correct type', () => {
    [XconsoleStep].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
