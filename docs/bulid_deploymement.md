## 构建和部署

- 本章构建和部署合起来讲，因为使用了vue-cli3,它本身就提供了构建部署的解决方案，在项目中只需根据自身需求进行配置，详细文档请参看[vue-cli3官方文档](https://cli.vuejs.org/zh/guide/)

### 开发/生产接口切换

> 为解决开发和生产接口之间的切换问题，我们这里采用了vue提供的[环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F),在不同开发环境中设置变量，关于相关文档说明参请看官方文档，下面直接说明本项目的具体操作。

#### 环境变量设置

- 在根目录创建.env.development和.env.production文件,顾名思义文件中的变量将会在对应模式下载入
  
  !> env.*文件中的变量必须以VUE_APP开头

 - .env.development文件
  ```env
  VUE_APP_URL=/
  VUE_APP_LOCAL=./
  VUE_APP_PUBLIC_PATH=/
  ```
  >  - .env.development文件中VUE_APP_URL是开发请求接口，在[vue.config.js](vue.config.js设置)设置了代理接口解决跨域问题
   - VUE_APP_LOCAL是作为请求本地城市列表的接口
   - VUE_APP_PUBLIC_PATH是本项目开发环境的服务器根路径



  - .env.production文件
  ```env
  VUE_APP_URL=//maoyan.wentmall.com/ajax
  VUE_APP_LOCAL=./
  VUE_APP_PUBLIC_PATH=/vue-maoyan/dist/
  ```

  >  - .env.production文件中VUE_APP_URL是线上请求接口，在maoyan.wentmall.com设置了反向代理解决m.maoyan.com数据接口的跨域问题，maoyan.wentmall.com只开放了针对本人github的域名的跨域请求，见谅
   - VUE_APP_LOCAL是作为请求本地城市列表的接口
   - VUE_APP_PUBLIC_PATH是本项目将部署在项目github pages文档的子路径dist上路径,设置详见[vue.config.js](vue.config.js设置)
 
#### vue.config.js设置

- 在根目录创建vue-cli配置文件vue.confing.js


```js

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'docs/dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  devServer: {
    proxy: 'http://m.maoyan.com/ajax'
  }
}

```

### 环境变量在axios中的使用

- 在不同的构建环境中，通过在环境配置文件中设置的VUE_APP_URL替换baseURL值，axios将以此作地址根请求数据，

```js
/**
 *  @addr src/util/request.js
*/

import Axios from 'axios'
let baseURL = process.env.VUE_APP_URL

const defaultConfig = {
  baseURL
}

const STATUS_CODE = 200

const instance = Axios.create(defaultConfig)

const request = (url, method = 'get') => (params) => {
  return instance({
    url,
    method,
    ...params
  }).then(resp => {
    if (resp.status === STATUS_CODE) {
      return resp.data
    }
  })
}

export default request

```

```js
import axios from 'axios'
import request from '@/util/request'
import { getDataByAction } from '@/util'

/**
 *  获取城市列表
 */

export const getCityList = () => axios.get(`${process.env.VUE_APP_LOCAL}/assets/json/cities.json`)

/**
 *  首页
 */

// 正在热映
const getMovieOnInfoList = request('/movieOnInfoList')
const getMoreComingList = request('/moreComingList')
export const getInfoListAction = getDataByAction(getMovieOnInfoList, getMoreComingList)

// 即将上映
export const getMostExpected = request('/mostExpected')

const getInitComingList = request('/comingList')
const getmoreComingList = request('/moreComingList')
export const getComingListAction = getDataByAction(getInitComingList, getmoreComingList)
// 影院
export const getCinemaList = request('/cinemaList')
// 电影详情(cinema-movie)
export const getMovieDetail = request('/detailmovie')

// 过滤影院
export const getFilterCinemas = request('/filterCinemas')
// 电影播放的影院
export const postMovie = request('/movie', 'post')

// 影院电影
export const getCinemaDetail = request('/cinemaDetail')

// 搜索
export const getSearch = request('/search')


```

### 部署遇到的坑

> 项目部署在github的域名下，github强制要求ajax请求也必须是https协议，http请求的数据会被浏览器block，解决方案就是将反向代理的链接的升级为https


