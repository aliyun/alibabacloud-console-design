import ConsoleDesignModel from '../src/index'

describe('ConsoleDesignModel #main', () => {
  it('exports in correct type', () => {
    [ConsoleDesignModel].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
