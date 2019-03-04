
const devProxy = ['/pc', '/weixin', 'android'] // 代理
// var proEnv = require('./config/pro.env') // 生产环境
// var uatEnv = require('./config/uat.env') // 测试环境
var devEnv = require('./config/dev.env') // 本地环境
const env = process.env.NODE_ENV
let target = ''
// 默认是本地环境
if (env === 'production') {
  target = proEnv.hosturl;
} else if (env === 'test') {
  target = uatEnv.hosturl;
} else {
  target = devEnv.hosturl
}
// 生成代理配置对象
let proxyObj = {}
devProxy.forEach((value, index) => {
  proxyObj[value] = {
    target: target,
    changeOrigin: true,
    pathRewrite: {
      [`^${value}`]: value
    }
  }
})

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    proxy: 'http://maoyan.wentmall.com/ajax/'
  }
}
