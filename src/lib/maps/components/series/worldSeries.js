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

        let polygonTemplate = worldSeries.mapPolygons.template;

        if(tooltipText) {
            polygonTemplate.tooltipText = tooltipText;
        }
        
        if(tooltipHTML) {
            polygonTemplate.tooltipHTML = tooltipHTML;
        }

        let mapColor = config.color && am4core.color(config.color) || map.colors.getIndex(0)
        polygonTemplate.fill = mapColor;
        polygonTemplate.nonScalingStroke = true;

        let hoverState = polygonTemplate.states.create("hover");
        hoverState.properties.fill = config.hoverColor && am4core.color(config.hoverColor) || am4core.color("#367B25");

        if(config.heatRules) {
            const { legendMinValue, legendMaxValue, colorMin, colorMax, legendAlign, legendVAlign, legendRotation } = config.heatRules
            //Set min/max fill color for each area
            worldSeries.heatRules.push({
                property: "fill",
                target: polygonTemplate,
                min: mapColor.brighten(colorMin || 10),
                max: mapColor.brighten(colorMax || 2)
            });

            // Set up heat legend
            let heatLegend = map.createChild(am4maps.HeatLegend);
            heatLegend.series = worldSeries;
            heatLegend.align = "right";
            heatLegend.valign = "top";
            heatLegend.width = am4core.percent(20);
            heatLegend.marginRight = am4core.percent(4);
            heatLegend.minValue = legendMinValue;
            heatLegend.maxValue = legendMaxValue;
            heatLegend.rotation = 90;

            // Set up custom heat map legend labels using axis ranges
            var minRange = heatLegend.valueAxis.axisRanges.create();
            minRange.value = heatLegend.minValue;
            minRange.label.text = legendMinValue;
            var maxRange = heatLegend.valueAxis.axisRanges.create();
            maxRange.value = heatLegend.maxValue;
            maxRange.label.text = legendMaxValue;
        }

        if(config.zoomHandler) {
            var lastSelected;
            polygonTemplate.events.on("hit", function(ev) {
                if (lastSelected) {
                    lastSelected.isActive = false;
                }
                ev.target.series.chart.zoomToMapObject(ev.target);
                if (lastSelected !== ev.target) {
                    lastSelected = ev.target;
                }

                if(typeof config.zoomHandler === "function") {
                    config.zoomHandler.call(this.map);
                }
            });

            /* Create selected and hover states and set alternative fill color */
            var ss = polygonTemplate.states.create("active");
            ss.properties.fill = chart.colors.getIndex(2);

            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = chart.colors.getIndex(4);
        }
    }
}