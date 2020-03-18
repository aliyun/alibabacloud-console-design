import WidgetLoadManagement from '../src/index'

describe('WidgetLoadManagement #main', () => {
  it('exports in correct type', () => {
    [WidgetLoadManagement].forEach((ReactComponent) => {
      expect(typeof ReactComponent).toBe('function')
    })
  })
})
