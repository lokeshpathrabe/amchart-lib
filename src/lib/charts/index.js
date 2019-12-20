import { schema } from "./configSchema";
import Charts from './components/charts';
import ConfigFactory from "./configStore";
import Legends from "./components/legends";
import Series from "./components/series";

export default class DruvaCharts {
    constructor(id, config) {
        config = {id, ...config};
        this.validateConfig(config);
        this.initConfigFactory(config);
        return this.initChart();
    }

    validateConfig(config) {
        if(typeof(config) === 'string') {
            try{
                config = JSON.parse(config);
            } catch (err){
                throw new Error('Invalid chart config.');
            }
        } else if(typeof(config) === 'object'){
            config = config;
        }

        //Yup vlaidation for object
        if(!schema.isValid(config)) {
            throw new Error('Invalid chart config.');
        }

        if(!document.querySelector(`#${config.id}`)) {
            throw new Error(`Element with id ${condid.id} not found`);
        }
    }

    initConfigFactory(config) {
        this.configFactory = new ConfigFactory(config);
    }

    initChart() {
        const [type, cfg] = this.configFactory.chartConfig;
        let chart = new Charts[type](cfg);
        this.chart = chart.getChartObj();
        this.addSeries();
        this.addLegend();
        return chart;
    }

    addSeries() {
        const [type, cfg] = this.configFactory.seriesConfig;
        Series[type].add(this.chart, cfg);
    }

    addLegend() {
        const config = this.configFactory.legendConfig;
        if(config) {
            const [type, cfg] = config;
            Legends[type].add(this.chart, cfg);
        }
    }
}