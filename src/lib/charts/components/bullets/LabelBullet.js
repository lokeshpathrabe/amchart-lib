import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const LabelBullet = {
  add: (series, config) => {
    const { color, bulletText, ...others } = config;
    let bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.label.text = config.bulletText;
    bullet.locationY = 0.5;
    bullet.label.fill = am4core.color(config.color);;
    bullet.locationY = 0;
    bullet.layout = 'none'
    for(let key in others) {
      bullet.label[key] = others[key];
    }

    return bullet;
  }
}