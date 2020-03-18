import XconsolePortal from '../src/index'

describe('XconsolePortal #main', () => {
  it('exports in correct type', () => {
    [XconsolePortal].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
