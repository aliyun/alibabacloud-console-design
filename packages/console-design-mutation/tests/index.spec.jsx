import XconsoleMutation from '../src/index'

describe('XconsoleMutation #main', () => {
  it('exports in correct type', () => {
    [XconsoleMutation].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
