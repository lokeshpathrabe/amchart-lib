import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import SERIES_CONST from './../../const/series';
import { showIndicator } from "./seriesLoader";

export const DrillDownWorldSeries = {
    add: (map, config) => {
        const { tooltipText, tooltipHTML } = config;
        map.geodata = am4geodata_worldLow;
        let worldSeries = map.series.push(new am4maps.MapPolygonSeries());
        worldSeries.name= SERIES_CONST.WORLD_MAP_SERIES;
        worldSeries.exclude = config.exclude;
        worldSeries.useGeodata = true;
        worldSeries.dataFields.value = config.value;

        let worldTemplate = worldSeries.mapPolygons.template;

        if(tooltipText) {
            worldTemplate.tooltipText = tooltipText;
        }
        
        if(tooltipHTML) {
            worldTemplate.tooltipHTML = tooltipHTML;
        }

        let mapColor = config.color && am4core.color(config.color) || map.colors.getIndex(0)
        worldTemplate.fill = mapColor;
        worldTemplate.nonScalingStroke = true;

        let hoverState = worldTemplate.states.create("hover");
        hoverState.properties.fill = config.hoverColor && am4core.color(config.hoverColor) || am4core.color("#367B25");

        if(config.heatRules) {
            const { legendMinValue, legendMaxValue, colorMin, colorMax } = config.heatRules
            //Set min/max fill color for each area
            worldSeries.heatRules.push({
                property: "fill",
                target: worldTemplate,
                min: mapColor.brighten(colorMin || 10),
                max: mapColor.brighten(colorMax || 2)
            });

            // Set up heat legend
            var heatLegend = map.chartContainer.createChild(am4maps.HeatLegend);
            heatLegend.valign = "bottom";
            heatLegend.align = "left";
            heatLegend.width = am4core.percent(50);
            heatLegend.series = worldSeries;
            heatLegend.orientation = "horizontal";
            heatLegend.padding(20, 20, 20, 20);
            heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
            heatLegend.valueAxis.renderer.minGridDistance = 40;
            heatLegend.markerCount = 5;

            // Set up custom heat map legend labels using axis ranges
            var minRange = heatLegend.valueAxis.axisRanges.create();
            minRange.value = heatLegend.minValue;
            minRange.label.text = legendMinValue;
            var maxRange = heatLegend.valueAxis.axisRanges.create();
            maxRange.value = heatLegend.maxValue;
            maxRange.label.text = legendMaxValue;
        }

        // if(config.onZoom) {
        //     var lastSelected;
        //     worldTemplate.events.on("hit", function(ev) {
        //         if (lastSelected) {
        //             lastSelected.isActive = false;
        //         }
        //         ev.target.series.chart.zoomToMapObject(ev.target);
        //         if (lastSelected !== ev.target) {
        //             lastSelected = ev.target;
        //         }

        //         if(typeof config.onZoom === "function") {
        //             config.onZoom.call(map);
        //         }
        //     });

        //     /* Create selected and hover states and set alternative fill color */
        //     var ss = worldTemplate.states.create("active");
        //     ss.properties.fill = map.colors.getIndex(2);

        //     var hs = worldTemplate.states.create("hover");
        //     hs.properties.fill = map.colors.getIndex(4);
        // }

        // Create country specific series (but hide it for now)
        var countrySeries = map.series.push(new am4maps.MapPolygonSeries());
        countrySeries.useGeodata = true;
        countrySeries.name = SERIES_CONST.DRILL_DOWN_COUNTRY_SERIES;
        countrySeries.hide();
        countrySeries.geodataSource.events.on("done", function(ev) {
            countrySeries.show();
        });

        var countryPolygon = countrySeries.mapPolygons.template;
        countryPolygon.tooltipText = "{name}";
        countryPolygon.nonScalingStroke = true;
        countryPolygon.strokeOpacity = 0.5;
        countryPolygon.fill = am4core.color("#eee");

        var hs = countryPolygon.states.create("hover");
        hs.properties.fill = map.colors.getIndex(5);

        // Set up click events
        worldTemplate.events.on("hit", function(ev) {
            let series = ev.target.series;
            series.chart.zoomToMapObject(ev.target);
            var targetMap = ev.target.dataItem.dataContext.map;
            if (targetMap) {
                ev.target.isHover = false;
                countrySeries.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/" + targetMap[0] + ".json";
                countrySeries.geodataSource.load();
                if(config.onZoom && typeof config.onZoom === "function") {
                    config.onZoom.call(null, map, ev.target);
                }
            }
        });
    }
}