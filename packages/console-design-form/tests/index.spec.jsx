import ConsoleDesignForm from '../src/index'

describe('ConsoleDesignForm #main', () => {
  it('exports in correct type', () => {
    [ConsoleDesignForm].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
