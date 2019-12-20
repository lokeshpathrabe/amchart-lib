import SERIES from './../../const/series';
import { WorldSeries } from './worldSeries';
import { IndiaSeries } from './indiaSeries';
import { USASeries } from './usaSeries';

const AllSeries = {};
AllSeries[SERIES.WORLD_MAP_SERIES] = WorldSeries;
AllSeries[SERIES.USA_MAP_SERIES] = USASeries;
AllSeries[SERIES.INDIA_MAP_SERIES] = IndiaSeries;

export default AllSeries;

