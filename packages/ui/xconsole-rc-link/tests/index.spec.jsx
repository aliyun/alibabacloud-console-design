import WindProRcLink from '../src/index'

describe('WindProRcLink #main', () => {
  it('exports in correct type', () => {
    [WindProRcLink].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
