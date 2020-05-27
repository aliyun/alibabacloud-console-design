
const { shallow } = require('enzyme');
const XConsoleMutation = require('../lib/index')

describe('top level react instance', () => {
  describe('reactIntl.html()', () => {
    const comp = () => {
      return <XConsoleMutation />
    }
    const actual = shallow(<comp />)
    console.log(actual, actual.getElement());
    expect(
      actual.getElement().props.dangerouslySetInnerHTML.__html
    ).toMatchInlineSnapshot(`"var1: 1234567. var2: asdasd"`)
  })
})
