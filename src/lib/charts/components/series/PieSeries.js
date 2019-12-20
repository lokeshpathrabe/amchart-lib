import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Bullets from './../bullets';

export const PieSeries ={ 
  add: (chart, config) => {
    if(config && Array.isArray(config.list)) {
      const { category, list } = config;
      return list.map((cfg) => {
        const { tooltipText, tooltipHTML} = cfg;

        let series = chart.series.push(new am4charts.PieSeries());

        if(tooltipText) {
            series.slices.template.tooltipText = tooltipText;
        }
        
        if(tooltipHTML) {
            series.slices.template.tooltipHTML = tooltipHTML;
        }
        
        series.dataFields.category = category;
        series.dataFields.value = cfg.value;

        if(cfg.radiusValue) {
            series.dataFields.radiusValue = cfg.radiusValue;
        }

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
            series.slices.template.adapter.add(type, wrapper);
          })
        }
    
        return series;
      })
    }
  }
}