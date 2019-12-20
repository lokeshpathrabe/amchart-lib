export default class ConfigFactory {
    constructor(config) {
        this.config = config;
    }

    getConfig() {
        return this.config;
    }

    get chartConfig() {
        const { id, yAxis, xAxis, type } = this.config;
        return [type, { id, yAxis, xAxis }];
    }

    get seriesConfig() {
        const { category } = this.config.xAxis;
        const { type, list } = this.config.series;
        return [type, {category, list}];
    }

    get legendConfig() {
        if(this.config.legend) {
            const { type, ...legendConfig } = this.config.legend;
            return [type, legendConfig];
        }
        return null;
    }
}