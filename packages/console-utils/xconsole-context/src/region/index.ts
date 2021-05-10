import ConsoleBase from '../console/ConsoleBase';
import { getActiveId } from './cookies';

export default {
  onRegionChange: ConsoleBase.onRegionChange,
  toggleRegion: ConsoleBase.toggleRegion,
  setRegionId: ConsoleBase.setRegionId,
  setRegions: ConsoleBase.setRegions,
  setRegionResourceCount: ConsoleBase.setRegionResourceCount,
  toggleRegionGlobal: ConsoleBase.toggleRegionGlobal,
  getCurrentRegionId: (): string => getActiveId(),
  setCurrentRegionId: (regionId: string) => ConsoleBase.setRegionId(regionId),
};
