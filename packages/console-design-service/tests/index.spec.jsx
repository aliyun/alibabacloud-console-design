import XconsoleService from '../src/index'

describe('XconsoleService #main', () => {
  it('exports in correct type', () => {
    [XconsoleService].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
