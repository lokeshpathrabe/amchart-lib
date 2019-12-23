export default class ConfigFactory {
    constructor(config) {
        this.config = config;
    }

    getConfig() {
        return this.config;
    }

    get mapConfig() {
        const { id, type } = this.config;
        return [type, { id }];
    }

    get seriesConfig() {
        return this.config.series;
    }

    get legendConfig() {
        if(this.config.legend) {
            const { type, ...legendConfig } = this.config.legend;
            return [type, legendConfig];
        }
        return null;
    }
}