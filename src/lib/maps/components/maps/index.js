import MAP_CONSTS from './../../const/map';
import WorldMap from './WorldMap';
import WorldHeatMap from './WorldHeatMap';

const AllMaps = {};
AllMaps[MAP_CONSTS.WORLD_MAP] = WorldMap;
AllMaps[MAP_CONSTS.WORLD_HEAT_MAP] = WorldHeatMap;

export default AllMaps;
