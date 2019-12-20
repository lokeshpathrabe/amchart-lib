import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import ChartInterface from "./ChartInterface";

export default class PieChart extends ChartInterface {
  constructor(config) {
    super(config);
    let chart = am4core.create(config.id, am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0;
    chart.colors.step = 3;
    this.chart = chart;
  }
  
  onSliceClick(callback) {
    this.chart.series.each((s) => {
      s.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
      s.slices.template.events.on("hit", callback);
    });
  }

  setCornerRadius(radius) { 
    this.chart.series.each((s) => s.slices.template.cornerRadius = radius);
  }
}