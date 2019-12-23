import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { schema } from "./configSchema";
import ConfigFactory from "./configStore";
import Maps from './components/maps';
import Series from './components/series';

am4core.useTheme(am4themes_animated);

class DruvaMaps {

    createMap(id, config) {
        config.id = id;
        this.validateConfig(config);
        let configFactory = this.initConfigFactory(config)
        let druvaMap = this.initMap(configFactory);

        this.addSeries(druvaMap, configFactory);
        this.addLegend(druvaMap, configFactory);

        return druvaMap;
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
        return new ConfigFactory(config);
    }

    initMap(configFactory) {
        const [type, cfg] = configFactory.mapConfig;
        return new Maps[type](cfg);
    }

    addSeries(druvaMap, configFactory) {
        const list = configFactory.seriesConfig;
        list.forEach((series) => {
            const { type, ...cfg } = series
            Series[type].add(druvaMap.getMapObj(), cfg);
        });
    }

    addLegend(druvaMap, configFactory) {
        const config = configFactory.legendConfig;
        if(config) {
            const [type, cfg] = config;
            Legends[type].add(druvaMap.getMapObj(), cfg);
        }
    }
}

const DruvaMapsFactory = new DruvaMaps();
export { DruvaMapsFactory };