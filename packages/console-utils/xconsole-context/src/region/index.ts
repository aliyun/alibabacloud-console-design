import ConsoleBase from '../console/ConsoleBase';
import { getActiveId } from './cookies';

export default {
  onRegionChange: ConsoleBase.onRegionChange,
  toggleRegion: ConsoleBase.toggleRegion,
  setRegionId: ConsoleBase.setRegionId,
  setRegions: ConsoleBase.setRegions,
  setRegionResourceCount: ConsoleBase.setRegionResourceCount,
  getCurrentRegionId: (): string => getActiveId(),
};
