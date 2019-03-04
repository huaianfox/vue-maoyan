const env = process.env.NODE_ENV

module.exports = {
  publicPath: env === 'production' ? '/vue-maoyan/dist/' : '/',
  outputDir: 'docs/dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  devServer: {
    proxy: 'http://m.maoyan.com/ajax'
  }
}
