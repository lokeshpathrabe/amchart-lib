import { ColumnSeries } from './ColumnSeries';
import SERIES_CONSTS from '../../const/series';
import { StackedColumnSeries } from './StackedColumnSeries';
import { PieSeries } from './PieSeries';
const AllSeries = {}

AllSeries[SERIES_CONSTS.COLUMN_SERIES] = ColumnSeries;
AllSeries[SERIES_CONSTS.STACKED_COLUMN_SERIES] = StackedColumnSeries;
AllSeries[SERIES_CONSTS.PIE_SERIES] = PieSeries

export default AllSeries;
