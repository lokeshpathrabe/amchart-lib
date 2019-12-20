module.exports = {
  type: 'web-app',
  npm: {
    umd: 'DruvaAmCharts',
    umd: {
      global: 'DruvaAmCharts',
      entry: './src/lib/index.js',
      externals: {
        'amcharts4': 'amcharts4'
      }
    }
  }
}
