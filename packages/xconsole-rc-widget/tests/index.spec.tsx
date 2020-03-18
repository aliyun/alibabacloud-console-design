import XconsoleRcWidget from '../src/index'

describe('XconsoleRcWidget #main', () => {
  it('exports in correct type', () => {
    [XconsoleRcWidget].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
