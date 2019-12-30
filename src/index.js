import { InitChart, InitMap } from "./demo/";

let appTittle = document.querySelector('#tittle');
let mapHeader = document.querySelector('.tab-header.maps');
let mapBody = document.querySelector('.tab-body.tab-body-map');
let chartBody = document.querySelector('.tab-body.tab-body-chart');

appTittle.innerHTML = '<h2>Welcome to amChartLib</h2>'


InitChart();
InitMap();