import XconsoleQuery from '../src/index'

describe('XconsoleQuery #main', () => {
  it('exports in correct type', () => {
    [XconsoleQuery].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
