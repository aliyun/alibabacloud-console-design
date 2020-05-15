import Cookie from 'js-cookie'
import withData from './withData'

const getRegionFromRegion = () => (
  Cookie.get('currentRegionId') ||
  Cookie.get('activeRegionId')
)

export default ({
  dataKey = 'region',
  getter = getRegionFromRegion,
} = {}) => withData(dataKey, getter)
