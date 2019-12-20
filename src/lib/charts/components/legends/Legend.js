import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const Legend = {
  add: (chart, cfg) => {
    chart.legend = new am4charts.Legend();
    for(let key in cfg) {
      chart.legend[key] = cfg[key];
    }
  }
}
