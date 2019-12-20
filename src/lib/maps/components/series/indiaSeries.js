import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_indiaLow from "@amcharts/amcharts4-geodata/indiaLow";

export const IndiaSeries = {
    add: (map, config) => {

        // Series for India map
        let indiaSeries = map.series.push(new am4maps.MapPolygonSeries());
        indiaSeries.geodata = am4geodata_indiaLow;
        let indiaPolygonTemplate = indiaSeries.mapPolygons.template;
        indiaPolygonTemplate.tooltipText = "{name}";
        indiaPolygonTemplate.fill = map.colors.getIndex(1);
        indiaPolygonTemplate.nonScalingStroke = true;

        // Hover state
        hs = indiaPolygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("red");
    }
}