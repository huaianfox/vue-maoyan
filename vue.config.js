
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'docs/dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  devServer: {
    proxy: 'http://m.maoyan.com/ajax'
  }
}
