module.exports = {
  type: 'web-app',
  npm: {
    umd: 'AmChartsLib',
    umd: {
      global: 'AmChartsLib',
      entry: './src/lib/index.js',
      externals: {
        'amcharts4': 'amcharts4'
      }
    }
  }
}
