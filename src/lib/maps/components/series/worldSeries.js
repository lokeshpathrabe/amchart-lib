import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

export const WorldSeries = {
    add: (map, config) => {
        map.geodata = am4geodata_worldLow;
        let worldSeries = map.series.push(new am4maps.MapPolygonSeries());
        worldSeries.exclude = ["AQ"];
        worldSeries.useGeodata = true;

        let polygonTemplate = worldSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = map.colors.getIndex(0);
        polygonTemplate.nonScalingStroke = true;

        let hoverState = polygonTemplate.states.create("hover");
        hoverState.properties.fill = am4core.color("#367B25");
    }
}