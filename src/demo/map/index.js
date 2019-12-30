import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Maps from '../../lib/maps/const/map';
import mapData from './mapData.json';
import { DruvaMapsFactory } from './../../lib/maps';
import MAP_SERIES from '../../lib/maps/const/series';
import drillDownMapData from './drillDownMap.json';
import capitalsData from './capitals.json';

export default function InitMap() {
    // world map
    am4core.useTheme(am4themes_animated);
    let mapConfig = {
        type: Maps.WORLD_MAP,
        series: [{
            type: MAP_SERIES.WORLD_MAP_SERIES,
            exclude: ["AQ"],
            tooltipText: "{name}: {value}"
        },
        {
            type: MAP_SERIES.USA_MAP_SERIES,
            tooltipText: "{name}: {value}"
        }]
    }

    let map = DruvaMapsFactory.createMap('worldmap', mapConfig);
    map.bindData(MAP_SERIES.USA_MAP_SERIES, JSON.parse(JSON.stringify(mapData.USData)));
    map.bindData(MAP_SERIES.WORLD_MAP_SERIES, JSON.parse(JSON.stringify(mapData.worldData)));
    map.addHomeButton();

    // world heat map
    let heatMapConfig = {
        type: Maps.WORLD_MAP,
        series: [{
            type: MAP_SERIES.WORLD_MAP_SERIES,
            exclude: ["AQ"],
            tooltipText: "{name}: {value}",
            color: "#00B2E0",
            heatRules: {
                colorMin: 4,
                colorMax: -0.3,
                legendMinValue: 1000,
                legendMaxValue: 5000,
            },
            onZoom: (map) => {
                console.log(map);
            }
        }]
    }

    let heatMap = DruvaMapsFactory.createMap('worldHeatmap', heatMapConfig);
    heatMap.bindData(MAP_SERIES.WORLD_MAP_SERIES, JSON.parse(JSON.stringify(mapData.worldData)));
    heatMap.addZoomControl();
    heatMap.addHomeButton();

    //World capitals map
    let capitalsMapConfig = {
        type: Maps.WORLD_MAP,
        series: [{
            type: MAP_SERIES.WORLD_MAP_SERIES,
            exclude: ["AQ"],
            color: "#00B2E0",
            onZoom: (map, series) => {
                console.log(map);
                console.log(series);                
            }
        },
        {
            type: MAP_SERIES.IMAGE_SERIES,
            latitude: "latitude",
            longitude: "longitude",
            imagePath: "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z",
            tooltipText: "{title}",
            tooltipHTML: ""
        }
    ]
    }
    let capitalsMap = DruvaMapsFactory.createMap('capitalsMap', capitalsMapConfig);
    capitalsMap.bindData(MAP_SERIES.IMAGE_SERIES, JSON.parse(JSON.stringify(capitalsData)));
    capitalsMap.addZoomControl();
    capitalsMap.addHomeButton();

    //World Heat map with drill down zoom
    let drillDownHeatMapConfig = {
        type: Maps.WORLD_MAP,
        series: [{
            type: MAP_SERIES.DRILL_DOWN_WORLD_SERIES,
            exclude: ["AQ"],
            tooltipText: "{name}: {value}",
            color: "#00B2E0",
            value: 'value1',
            heatRules: {
                colorMin: 4,
                colorMax: -0.3,
                legendMinValue: 1000,
                legendMaxValue: 5000,
            },
            onZoom: (map, target) => {
                map.series.each((mapSeries) => {
                    if(mapSeries.name === MAP_SERIES.IMAGE_SERIES) {
                        if(!mapSeries.visible) {
                            mapSeries.show();
                        }
                        mapSeries.data = JSON.parse(JSON.stringify(capitalsData))
                    }
                });
            }
        },
        {
            type: MAP_SERIES.IMAGE_SERIES,
            latitude: "latitude",
            longitude: "longitude",
            imagePath: "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z",
            tooltipText: "{title}",
            tooltipHTML: ""
        }
    ]
    }

    let drillDownHeatMap = DruvaMapsFactory.createMap('worldDrillDownHeatmap', drillDownHeatMapConfig);
    drillDownHeatMap.bindData(MAP_SERIES.WORLD_MAP_SERIES, JSON.parse(JSON.stringify(drillDownMapData)));
    drillDownHeatMap.addZoomControl();
    drillDownHeatMap.addHomeButton((map) => {
        map.series.each((mapSeries) => {
            if([MAP_SERIES.IMAGE_SERIES, MAP_SERIES.DRILL_DOWN_COUNTRY_SERIES].indexOf(mapSeries.name) > -1){
                mapSeries.hide();
            }
        });
    });
}