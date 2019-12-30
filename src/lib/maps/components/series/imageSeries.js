import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import SERIES_CONST from './../../const/series';

export const ImageSeries = {
    add: (map, config) => {
        // create capital markers
        let imageSeries = map.series.push(new am4maps.MapImageSeries());
        imageSeries.name = SERIES_CONST.IMAGE_SERIES;

        // define template
        let imageSeriesTemplate = imageSeries.mapImages.template;
        let circle = imageSeriesTemplate.createChild(am4core.Sprite);
        circle.scale = 0.4;
        circle.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        circle.path = config.imagePath;
        // what about scale...

        // set propertyfields
        imageSeriesTemplate.propertyFields.latitude = config.latitude;
        imageSeriesTemplate.propertyFields.longitude = config.longitude;

        imageSeriesTemplate.horizontalCenter = "middle";
        imageSeriesTemplate.verticalCenter = "middle";
        imageSeriesTemplate.align = "center";
        imageSeriesTemplate.valign = "middle";
        imageSeriesTemplate.width = 8;
        imageSeriesTemplate.height = 8;
        imageSeriesTemplate.nonScaling = true;
        if(config.tooltipText){
            imageSeriesTemplate.tooltipText = config.tooltipText;
        }
        
        if(config.tooltipHTML){
            imageSeriesTemplate.tooltipText = config.tooltipHTML;
        }

        imageSeriesTemplate.fill = am4core.color("#000");
        imageSeriesTemplate.background.fillOpacity = 0;
        imageSeriesTemplate.background.fill = am4core.color("#ffffff");
        imageSeriesTemplate.setStateOnChildren = true;
        imageSeriesTemplate.states.create("hover");
    }
}