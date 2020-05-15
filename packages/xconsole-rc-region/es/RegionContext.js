import connect from './connect';
import Provider from './Provider';
var RegionContext = connect(Provider);
RegionContext.propTypes = Provider.propTypes;
RegionContext.displayName = 'RegionContext';
export default RegionContext;