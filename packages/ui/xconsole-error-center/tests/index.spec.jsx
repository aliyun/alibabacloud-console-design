import XconsoleErrorCenter from '../src/index'

describe('XconsoleErrorCenter #main', () => {
  it('exports in correct type', () => {
    [XconsoleErrorCenter].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
