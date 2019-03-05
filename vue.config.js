const env = process.env.NODE_ENV

module.exports = {
  publicPath: env.VUE_APP_PUBLIC_PATH,
  outputDir: 'docs/dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  devServer: {
    proxy: 'http://m.maoyan.com/ajax'
  }
}
