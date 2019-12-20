import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { schema } from "./configSchema";
import ConfigFactory from "./configStore";
import Maps from './components/maps';
import Series from './components/series';

am4core.useTheme(am4themes_animated);

export default class DruvaMaps {
    constructor(id, config) {
        config = {id, ...config};
        this.validateConfig(config);
        this.initConfigFactory(config);
        return this.initMap();
    }

    validateConfig(config) {
        if(typeof(config) === 'string') {
            try{
                config = JSON.parse(config);
            } catch (err){
                throw new Error('Invalid map config.');
            }
        } else if(typeof(config) === 'object'){
            config = config;
        }

        //Yup vlaidation for object
        if(!schema.isValid(config)) {
            throw new Error('Invalid map config.');
        }

        if(!document.querySelector(`#${config.id}`)) {
            throw new Error(`Element with id ${condid.id} not found`);
        }
    }

    initConfigFactory(config) {
        this.configFactory = new ConfigFactory(config);
    }

    initMap() {
        const [type, cfg] = this.configFactory.mapConfig;
        let map = new Maps[type](cfg);
        this.map = map.getMapObj();
        this.addSeries();
        this.addLegend();
        return map;
    }

    addSeries() {
        const [type, cfg] = this.configFactory.seriesConfig;
        Series[type].add(this.map, cfg);
    }

    addLegend() {
        const config = this.configFactory.legendConfig;
        if(config) {
            const [type, cfg] = config;
            Legends[type].add(this.map, cfg);
        }
    }
}