import ColumnSeriesChart from './ColumnSeriesChart';
import CHART_CONSTS from '../../const/chart';
import StackedColumnSeriesChart from './StackedColumnChart';
import PieChart from './PieChart';

const AllCharts = {}
AllCharts[CHART_CONSTS.COLUMN_SERIES_CHART] = ColumnSeriesChart;
AllCharts[CHART_CONSTS.STACKED_COLUMN_SERIES_CHART] = StackedColumnSeriesChart;
AllCharts[CHART_CONSTS.PIE_CHART] = PieChart;

export default AllCharts;
