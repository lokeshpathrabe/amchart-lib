import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import ChartInterface from "./ChartInterface";
import ColumnSeriesChart from "./ColumnSeriesChart";

export default class StackedColumnSeriesChart extends ColumnSeriesChart {
  constructor(config) {
    super(config);
    let categoryAxis = this.chart.xAxes.getIndex(0);
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 20;
  
    let valueAxis = this.chart.yAxes.getIndex(0);
    valueAxis.min = config.yAxis.min;
    valueAxis.max = config.yAxis.max;
    valueAxis.renderer.minWidth = 10;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.disabled = true;
    valueAxis.renderer.minGridDistance = 10;

    this.chart.maskBullets = false;
  }
}