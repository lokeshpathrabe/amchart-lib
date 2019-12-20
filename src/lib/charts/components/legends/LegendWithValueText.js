import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const LegendWithValueText = {
  add: (chart, cfg) => {
    const { valueText, ...others } = cfg;
    chart.legend = new am4charts.Legend();
    chart.series.each((s) => s.legendSettings.valueText = cfg.valueText)
    for(let key in others) {
      chart.legend[key] = others[key];
    }
  }
}
