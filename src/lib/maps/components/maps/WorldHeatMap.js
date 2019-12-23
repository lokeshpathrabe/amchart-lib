import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import MapInterface from "./MapInterface";

export default class WorldHeatMap extends MapInterface{
    constructor(config) {
        super(config);
        let map = am4core.create(config.id, am4maps.MapChart);
        map.projection = new am4maps.projections.Miller();
        this.map = map;
    }
}