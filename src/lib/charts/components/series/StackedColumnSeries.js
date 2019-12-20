import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Bullets from './../bullets';

export const StackedColumnSeries ={ 
    add: (chart, config) => {
      if(config && Array.isArray(config.list)) {
        const { category, list } = config;
        return list.map((cfg) => {

            const tooltipText = cfg.tooltipText;
            const tooltipHTML = cfg.tooltipHTML;
            const color = am4core.color(cfg.color);

            let series = chart.series.push(new am4charts.ColumnSeries());
            series.name = cfg.name;
            series.stroke = false;
            series.stacked = true;
            series.columns.template.width = am4core.percent(50);
            series.columns.template.tooltipText = tooltipText;
            series.columns.template.tooltipHTML = tooltipHTML;
            series.columns.template.fill = color;
            series.columns.template.column.fillOpacity = 0.8;
            series.dataFields.categoryX = category;
            series.dataFields.valueY = cfg.value;
            series.dataFields.valueYShow = "totalPercent";
            series.dataItems.template.locations.categoryX = 0.5;

            series.tooltip.pointerOrientation = "vertical";

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
        });
      }
    }
  }