import XconsoleLogger from '../src/index'

describe('XconsoleLogger #main', () => {
  it('exports in correct type', () => {
    [XconsoleLogger].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
