import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import ChartInterface from "./ChartInterface";

export default class ColumnSeriesChart extends ChartInterface {
  constructor(config) {
    super(config);
    let chart = am4core.create(config.id, am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    chart.colors.step = 2;
    chart.padding(30, 30, 10, 30);
    chart.simplifiedProcessing = true;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = config.xAxis.category;
  
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.calculateTotals = true;
    this.chart = chart;
  }
  
  onColumnClick(callback) {
    this.chart.series.each((s) => {
      s.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
      s.columns.template.events.on("hit", callback);
    });
  }
}