import ConsoleLogger from '../src/index'

describe('ConsoleLogger #main', () => {
  it('exports in correct type', () => {
    [ConsoleLogger].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
