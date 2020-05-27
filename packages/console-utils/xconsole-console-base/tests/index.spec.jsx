import XconsoleConsoleBase from '../src/index'

describe('XconsoleConsoleBase #main', () => {
  it('exports in correct type', () => {
    [XconsoleConsoleBase].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
