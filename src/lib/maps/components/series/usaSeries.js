import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";

export const USASeries = {
    add: (map, config) => {
          // Series for United States map
          let usaSeries = map.series.push(new am4maps.MapPolygonSeries());
          usaSeries.geodata = am4geodata_usaLow;
          let usPolygonTemplate = usaSeries.mapPolygons.template;
          usPolygonTemplate.tooltipText = "{name}";
          usPolygonTemplate.fill = map.colors.getIndex(1);
          usPolygonTemplate.nonScalingStroke = true;
  
          // Hover state
          hs = usPolygonTemplate.states.create("hover");
          hs.properties.fill = am4core.color("red");
    }
}