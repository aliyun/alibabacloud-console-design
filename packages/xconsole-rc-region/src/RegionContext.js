import connect from './connect'
import Provider from './Provider'

const RegionContext = connect(Provider)
RegionContext.propTypes = Provider.propTypes
RegionContext.displayName = 'RegionContext'

export default RegionContext
