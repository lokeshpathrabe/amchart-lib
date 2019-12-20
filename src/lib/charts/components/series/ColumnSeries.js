import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Bullets from './../bullets';

export const ColumnSeries ={ 
  add: (chart, config) => {
    if(config && Array.isArray(config.list)) {
      const { category, list } = config;
      return list.map((cfg) => {
        const { tooltipText, tooltipHTML} = cfg;

        const color = am4core.color(cfg.color);
    
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.columns.template.width = am4core.percent(70);

        if(tooltipText) {
          series.columns.template.tooltipText = tooltipText;
        }

        if(tooltipHTML) {
          series.columns.template.tooltipHTML = tooltipHTML;
        }
        
        series.name = cfg.name;
        series.dataFields.categoryX = category;
        series.dataFields.valueY = cfg.value;
        series.dataItems.template.locations.categoryX = 0.5;
        series.tooltip.pointerOrientation = "vertical";
        series.columns.template.fill = color;
        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        //Add buller if config available
        if(cfg.bullet) {
          const {type, ...bulletConfig} = cfg.bullet;
          Bullets[type].add(series, bulletConfig);
        }

        //Add adaptors on series if provided
        if(cfg.adapter) {
          Object.keys(cfg.adapter).forEach((type) => {
            const wrapper = (...args) => {
              return cfg.adapter[type].call(null, ...args, chart);
            }
            series.columns.template.adapter.add(type, wrapper);
          })
        }
    
        return series;
      })
    }
  }
}