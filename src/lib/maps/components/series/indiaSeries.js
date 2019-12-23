import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_indiaLow from "@amcharts/amcharts4-geodata/indiaLow";
import SERIES_CONST from './../../const/series';

export const IndiaSeries = {
    add: (map, config) => {

        // Series for India map
        let indiaSeries = map.series.push(new am4maps.MapPolygonSeries());
        indiaSeries.name = SERIES_CONST.INDIA_MAP_SERIES;

        indiaSeries.geodata = am4geodata_indiaLow;
        let indiaPolygonTemplate = indiaSeries.mapPolygons.template;
        indiaPolygonTemplate.tooltipText = "{name}";
        indiaPolygonTemplate.fill = config.color && am4core.color(config.color) || map.colors.getIndex(0);
        indiaPolygonTemplate.nonScalingStroke = true;

        // Hover state
        hs = indiaPolygonTemplate.states.create("hover");
        hs.properties.fill = config.hoverColor && am4core.color(config.hoverColor) || am4core.color("#367B25");
    }
}