import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./styles.css";
import DruvaChart from '../lib/charts';
import Charts from '../lib/charts/const/chart';
import Maps from '../lib/maps/const/map';

import CHART_LEGENDS from '../lib/charts/const/legend';
import CHART_SERIES from '../lib/charts/const/series';
import CHART_BULLETS from '../lib/charts/const/bullet';
import json from './data.json';

import DruvaMaps from "../lib/maps";
import MAP_SERIES from './../lib/maps/const/series';

am4core.useTheme(am4themes_animated);
export default function InitDemoChart() {

    //Stacked Column Series Chart
    const stackedColConfig = {
         //throw error if this element is not present
        type: Charts.STACKED_COLUMN_SERIES_CHART,
        xAxis: {
            category: 'category'
        },
        yAxis: {
          min: 0,
          max: 100
        },
        series: {
            type: CHART_SERIES.STACKED_COLUMN_SERIES,
            list: [{ // Will always be as array
                    color: "#FBC67A",
                    format: "#",
                    name: "Files Modification Alerts",
                    tooltipHTML: "<span>{name}</span> </br> <center><strong>{valueY.value.formatNumber('#')}</strong></center>",
                    value: "value1"
                },
                {
                    color: "#88A7EC",
                    format: "#",
                    name: "Files Encryption Alerts",
                    tooltipHTML: "<span>{name}</span> </br> <center><strong>{valueY.value.formatNumber('#')}</strong></center>",
                    value: "value2"
                },
                {
                    color: "#88E6AF",
                    format: "#",
                    name: "Files Deletion Alerts",
                    tooltipHTML: "<span>{name}</span> </br> <center><strong>{valueY.value.formatNumber('#')}</strong></center>",
                    value: "value3"
                },
                {
                    color: "#EE74A2",
                    format: "#",
                    name: "Files Creation Alerts",
                    tooltipHTML: "<span>{name}</span> </br> <center><strong>{valueY.value.formatNumber('#')}</strong></center>",
                    value: "value4",
                    bullet: {
                        type: CHART_BULLETS.LABEL_BULLET,
                        bulletText: "{valueY.total}",
                        fill: '#000',
                        dy: -20,
                        fontSize: 20
                    }
                }
            ]},
        legend: {
            type: CHART_LEGENDS.LEGEND_WITH_VALUE_TEXT,
            position: 'right',
            vAlign: 'bottom',
            value: 'valueY'
        }
    }
    let chart1 = new DruvaChart('stackedColumnSeries', stackedColConfig);

    if(json.stackedColumnData.length > 7){
        const xAxesTemplate = chart1.getChartObj().xAxes.getIndex(0).renderer.labels.template;
        xAxesTemplate.rotation = -90;
        xAxesTemplate.horizontalCenter = "middle";
        xAxesTemplate.verticalCenter = "middle";
    }
    chart1.bindData(json.stackedColumnData);



    // Column Series Chart
    const colConfig = {
        //throw error if this element is not present
       type: Charts.COLUMN_SERIES_CHART,
       xAxis: {
           category: 'country'
       },
       series: {
           type: CHART_SERIES.COLUMN_SERIES,
           list: [{ // Will always be as array
                   color: "#FBC87A",
                   format: "#",
                   name: "Files Modification Alerts",
                   tooltipText: "{valueY.value}",
                   value: "visits",
                   adapter: {
                    "fill": (fill, target, key, chart) => {
                     return chart.colors.getIndex(target.dataItem.index);
                   }
                }
               }
           ]
        }
   }
   let chart2 = new DruvaChart('columnSeries', colConfig);
   chart2.bindData(json.columnSeriesData);
   setTimeout(() => chart2.bindData(json.activityData), 5000);

    // Column Series Chart
    const activityChartConfig = {
    //throw error if this element is not present
    type: Charts.COLUMN_SERIES_CHART,
    xAxis: {
        category: 'country'
    },
    series: {
        type: CHART_SERIES.COLUMN_SERIES,
        list: [{ // Will always be as array
                color: "#FBC87A",
                format: "#",
                name: "Files Modification Alerts",
                tooltipText: "{valueY.value}",
                value: "visits",
                adapter: {
                "fill": (fill, target, key, chart) => {
                    if(target.dataItem.valueY > 2000){
                        return am4core.color("#EE74A2");
                    }
                    return am4core.color("#8A98B6");;
                }
            }
            }
        ]
    }
    }

    chart2.onColumnClick(function(ev) {
        alert("Clicked on " + ev.target.dataItem.categoryX + ": " + ev.target.dataItem.valueY);
    });

   let chart3 = new DruvaChart('activityChart', activityChartConfig);
   chart3.hideXAxes();
   chart3.hideYAxes();
   chart3.hideYAxesGridLines();
   chart3.hidexAxesGridLines();
   chart3.bindData(json.activityData);

    // PieChart

    let pieChartConfig = {
        //throw error if this element is not present
       type: Charts.PIE_CHART,
       xAxis: {
           category: 'country'
       },
       series: {
           type: CHART_SERIES.PIE_SERIES,
           list: [{ // Will always be as array
                   tooltipHTML: "<b>{category}: {value}</b>",
                   value: "value",
                   radiusValue: "value"
               }
           ]
        },
        legend: {
            type: CHART_LEGENDS.LEGEND_WITH_VALUE_TEXT,
            position: 'bottom',
            vAlign: 'bottom',
            valueText: '{value}'
        }
   }

   let pieChart = new DruvaChart('pieChart', pieChartConfig);
   pieChart.bindData(json.pieChartData);
   pieChart.setCornerRadius(6);

   // world map
   let mapConfig = {
       type: Maps.WORLD_MAP,
       series: {
           type: MAP_SERIES.WORLD_MAP_SERIES,
           list: [
                
           ]
       }
   }

   let map = new DruvaMaps('worldmap', mapConfig);
}

