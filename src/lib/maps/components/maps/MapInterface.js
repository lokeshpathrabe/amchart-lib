import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";

export default class MapInterface {

    addSeries() {
        throw new Error('Function addSeries not implemented');
    }

    addLegend() {
        throw new Error('Function addLegend not implemented');
    }

    getMapConfig() {
        return this.config;
    }

    getMapObj(){
        return this.map;
    }

    bindData(name, data) {
        if(typeof(name) === 'string'){
            this.map.series.each((s) => {
                if(s.name === name) {
                    s.data = data;
                }
            });
        }
    }

    addZoomControl() {
        this.map.zoomControl = new am4maps.ZoomControl();
    }

    addHomeButton(callBack) {
        this.addZoomControl();
        let map = this.map;
        var homeButton = new am4core.Button();
            homeButton.events.on("hit", function(){
            map.goHome();
            if(typeof callBack === "function"){
                callBack.call(null, map);
            }
        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = this.map.zoomControl;
        homeButton.insertBefore(this.map.zoomControl.plusButton);
    }
}