export default class ChartInterface {

    constructor(config) {
        this.config;
    }

    getChartConfig() {
        return this.config;
    }

    getChartObj(){
        return this.chart;
    }

    bindData(data) {
        this.chart.data = data;
    }

    hideXAxes() {
        const xAxes = this.chart.xAxes.getIndex(0);
        xAxes.renderer.disabled = true;
    }
    
    hideYAxes() {
        const yAxes = this.chart.yAxes.getIndex(0);
        yAxes.renderer.disabled = true;
    }

    setSeriesColumnWidth() {
        this.chart.series.columns.template.width = am4core.percent(70);
    }

    hidexAxesGridLines() {
        const xAxes = this.chart.xAxes.getIndex(0);
        xAxes.renderer.grid.template.disabled = true;
    }

    hideYAxesGridLines() {
        const yAxes = this.chart.yAxes.getIndex(0);
        yAxes.renderer.grid.template.disabled = true;
    }

    addScrolBarX(chart) {
        this.chart.scrollbarX = new am4core.Scrollbar();
    }

    addScrolBarY(chart) {
        this.chart.scrollbarY = new am4core.Scrollbar();
    }
}