import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import SERIES_CONST from './../../const/series';

export const USASeries = {
    add: (map, config) => {
        const { tooltipText, tooltipHTML } = config;
        let usaSeries = map.series.push(new am4maps.MapPolygonSeries());
        usaSeries.name = SERIES_CONST.USA_MAP_SERIES;
        usaSeries.geodata = am4geodata_usaLow;
        usaSeries.useGeodata = true;
        let usPolygonTemplate = usaSeries.mapPolygons.template;

        if(tooltipText) {
            usPolygonTemplate.tooltipText = tooltipText;
        }

        if(tooltipHTML) {
            usPolygonTemplate.tooltipHTML = tooltipHTML;
        }

        usPolygonTemplate.fill = config.color && am4core.color(config.color) || map.colors.getIndex(0);
        usPolygonTemplate.nonScalingStroke = true;

        // Hover state
        let hs = usPolygonTemplate.states.create("hover");
        hs.properties.fill = config.hoverColor && am4core.color(config.hoverColor) || am4core.color("#367B25");

    }
}