import ConsoleDesignContext from '../src/index'

describe('ConsoleDesignContext #main', () => {
  it('exports in correct type', () => {
    [ConsoleDesignContext].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
