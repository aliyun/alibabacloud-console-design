import XconsoleRcPage from '../src/index'

describe('XconsoleRcPage #main', () => {
  it('exports in correct type', () => {
    [XconsoleRcPage].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
