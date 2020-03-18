import WindProRcForm from '../src/index'

describe('WindProRcForm #main', () => {
  it('exports in correct type', () => {
    [WindProRcForm].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
