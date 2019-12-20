export default class MapInterface {
    constructor(config) {
        this.config;
    }

    getMapConfig() {
        return this.config;
    }

    getMapObj(){
        return this.map;
    }

    bindData(data) {
        this.map.data = data;
    }
}