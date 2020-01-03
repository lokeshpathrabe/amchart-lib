import { schema } from "./configSchema";
import Charts from './components/charts';
import ConfigFactory from "./configStore";
import Legends from "./components/legends";
import Series from "./components/series";

class AMCharts {

    createChart(id, config) {
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
        let chartObj = chart.getChartObj();
        this.addSeries(chartObj);
        this.addLegend(chartObj);
        return chart;
    }

    addSeries(chart) {
        const [type, cfg] = this.configFactory.seriesConfig;
        Series[type].add(chart, cfg);
    }

    addLegend(chart) {
        const config = this.configFactory.legendConfig;
        if(config) {
            const [type, cfg] = config;
            Legends[type].add(chart, cfg);
        }
    }
}

const AMChartsFactory = new AMCharts();

export { AMChartsFactory } 