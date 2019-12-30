import SERIES from './../../const/series';
import { WorldSeries } from './worldSeries';
import { IndiaSeries } from './indiaSeries';
import { USASeries } from './usaSeries';
import { DrillDownWorldSeries } from './drillDownWorldSeries';
import { ImageSeries } from './imageSeries';

const AllSeries = {};
AllSeries[SERIES.WORLD_MAP_SERIES] = WorldSeries;
AllSeries[SERIES.USA_MAP_SERIES] = USASeries;
AllSeries[SERIES.INDIA_MAP_SERIES] = IndiaSeries;
AllSeries[SERIES.DRILL_DOWN_WORLD_SERIES] = DrillDownWorldSeries;
AllSeries[SERIES.IMAGE_SERIES] = ImageSeries;

export default AllSeries;

