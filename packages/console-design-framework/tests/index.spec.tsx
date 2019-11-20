import XconsoleRcAppLayout from '../src/index'

describe('XconsoleRcAppLayout #main', () => {
  it('exports in correct type', () => {
    [XconsoleRcAppLayout].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
