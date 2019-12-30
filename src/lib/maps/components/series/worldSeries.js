import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import SERIES_CONST from './../../const/series';

export const WorldSeries = {
    add: (map, config) => {
        const { tooltipText, tooltipHTML } = config;
        map.geodata = am4geodata_worldLow;
        let worldSeries = map.series.push(new am4maps.MapPolygonSeries());
        worldSeries.name= SERIES_CONST.WORLD_MAP_SERIES;
        worldSeries.exclude = config.exclude;
        worldSeries.useGeodata = true;

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
            const { legendMinValue, legendMaxValue, colorMin, colorMax, legendAlign, legendVAlign, legendRotation } = config.heatRules
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

        if(config.onZoom) {
            var lastSelected;
            worldTemplate.events.on("hit", function(ev) {
                if (lastSelected) {
                    lastSelected.isActive = false;
                }
                ev.target.series.chart.zoomToMapObject(ev.target);
                if (lastSelected !== ev.target) {
                    lastSelected = ev.target;
                }

                if(typeof config.onZoom === "function") {
                    config.onZoom.call(null, map);
                }
            });

            /* Create selected and hover states and set alternative fill color */
            var ss = worldTemplate.states.create("active");
            ss.properties.fill = map.colors.getIndex(2);

            var hs = worldTemplate.states.create("hover");
            hs.properties.fill = map.colors.getIndex(4);
        }
    }
}