import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";

var indicator

function showIndicator(series) {
  
  if (!indicator) {
    var indicator = series.tooltipContainer.createChild(am4core.Container);
    indicator.background.fill = am4core.color("#fff");
    indicator.background.fillOpacity = 0.8;
    indicator.width = am4core.percent(100);
    indicator.height = am4core.percent(100);

    var indicatorLabel = indicator.createChild(am4core.Label);
    indicatorLabel.text = "Loading stuff...";
    indicatorLabel.align = "center";
    indicatorLabel.valign = "middle";
    indicatorLabel.fontSize = 20;
    indicatorLabel.dy = 50;
    
    var hourglass = indicator.createChild(am4core.Image);
    hourglass.href = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/hourglass.svg";
    hourglass.align = "center";
    hourglass.valign = "middle";
    hourglass.horizontalCenter = "middle";
    hourglass.verticalCenter = "middle";
    hourglass.scale = 0.7;
  }
  
  indicator.hide(0);
  indicator.show();
}

function hideIndicator() {
  indicator.hide();
}

export { showIndicator, hideIndicator };