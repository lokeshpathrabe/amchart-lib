import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { schema } from "./configSchema";
import ConfigFactory from "./configStore";
import Maps from './components/maps';
import Series from './components/series';

am4core.useTheme(am4themes_animated);

class AMMaps {

    createMap(id, config) {
        config.id = id;
        this.validateConfig(config);
        let configFactory = this.initConfigFactory(config)
        let amMap = this.initMap(configFactory);

        this.addSeries(amMap, configFactory);
        this.addLegend(amMap, configFactory);

        return amMap;
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

    addSeries(amMap, configFactory) {
        const list = configFactory.seriesConfig;
        list.forEach((series) => {
            const { type, ...cfg } = series
            Series[type].add(amMap.getMapObj(), cfg);
        });
    }

    addLegend(amMap, configFactory) {
        const config = configFactory.legendConfig;
        if(config) {
            const [type, cfg] = config;
            Legends[type].add(amMap.getMapObj(), cfg);
        }
    }
}

const AMMapsFactory = new AMMaps();
export { AMMapsFactory };