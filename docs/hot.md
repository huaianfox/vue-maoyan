## 页面架构
```html
// src\pages\home\children\hot.vue

<template>
  <section class="inner">
    <List :path='path'
          :list='movieList' />
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </section>
</template>

<script>
import List from '../components/list'
import { getInfoListAction } from '@/api'
import { setImgSize } from '@/util'

export default {
  name: 'Hot',
  data () {
    return {
      path: 'cinema/movie/',
      movieList: [],
      movieIds: [],
      params: {
        token: ''
      },
      offset: 0,
      limit: 12,
      total: 0
    }
  },
  props: {
    msg: String
  },
  components: {
    List
  },
  methods: {
    infiniteHandler ($state) {
      const { offset, limit, total } = this
      const isFirst = offset === 0
      if (offset && offset > total) return
      const movieIds = this.movieIds
        .slice(offset, offset + limit)
        .join()
      const params = { params: { ...this.params, movieIds } }
      const getMovieInfoList = getInfoListAction(isFirst)
      getMovieInfoList(params).then(data => {
        const { movieIds, movieList, coming, total } = data
        if (movieIds) {
          this.movieIds = movieIds
          this.total = total
          return movieList
        }
        return coming
      }).then(data => {
        if (data.length) {
          this.offset += data.length
          this.movieList.push(...setImgSize(data))
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>
```

## API接口设计
### 接口分析
#### 初始化获取hot电影列表
| 信息        | 说明                                |
| :---------- | :---------------------------------- |
| 功能        | 初始化获取电影信息                  |
| URL         | //m.maoyan.com/ajax/movieOnInfoList |
| 格式        | JSON                                |
| HTTP METHOD | GET                                 |

##### 请求参数
| 参数  | 类型   | 必选  | 说明           |
| :---- | :----- | ----- | -------------- |
| token | String | false | 登录之后的凭证 |

##### 返回字段
| 字段      | 类型   | 说明                                            |
| :-------- | :----- | ----------------------------------------------- |
| movieList | Array  | 电影列表（默认一次返回10条）                    |
| total     | Number | 列表总数目                                      |
| movieIds  | Array  | 所有电影ID，总数同total，后续请求更多电影时必须 |
| coming    | Array  | 更多电影列表，第一次请求必定是空                |

#### 获取hot更多电影列表
| 信息        | 说明                               |
| :---------- | :--------------------------------- |
| 功能        | 获取hot更多电影列表                |
| URL         | //m.maoyan.com/ajax/moreComingList |
| 格式        | JSON                               |
| HTTP METHOD | GET                                |

##### 请求参数
| 参数     | 类型   | 必选  | 说明                                               | 列子                      |
| :------- | :----- | ----- | -------------------------------------------------- | ------------------------- |
| token    | String | false | 登录之后的凭证                                     |
| movieIds | String | true  | 请求的电影ID，依赖初始化接口的接口返回字段movieIds | "1214652,1229799,1251606" |

##### 返回字段
| 字段   | 类型  | 说明         |
| :----- | :---- | ------------ |
| coming | Array | 更多电影列表 |

### 合并接口
仔细分析上述两个接口的请求和返回字段，完全可以合并成一个接口调用，在此需要解决两个问题，如何判断是初始化还是加载更多和如何处理两个接口返回的字段。
```json
{
  movieList: [],
  movieIds: [],
  params: {
    token: ''
  },
  offset: 0,
  limit: 12,
  total: 0
}
```
定义如上数据，我们用offset === 0 来判断是否是初始化还是加载更多。
#### 生成调用api
```javascript
/**
 * 生成最后的调用接口  @addr src\pages/home\children\hot: line38
 * @isFirst 是否是第一次
 * @getMovieInfoList 生成最终的调用接口
*/
const isFirst = offset === 0
const getMovieInfoList = getInfoListAction(isFirst)

/**
 * 正在热映 @addr src\api
 * @getMovieOnInfoList 初始化接口
 * @getMoreComingList  加载更多接口
 * @getInfoListAction api生成函数
*/
const getMovieOnInfoList = request('/movieOnInfoList')
const getMoreComingList = request('/moreComingList')
export const getInfoListAction = getDataByAction(getMovieOnInfoList, getMoreComingList)

// 接口判断 src\util\index.js: getInfoListAction
export const getDataByAction = (initAction, nextAction) => (isFirst) => isFirst ? initAction : nextAction

// 通用request简单封装axios  @addr src\util\request.js
import Axios from 'axios'
const defaultConfig = {
  baseURL: '/'
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
```
#### 处理返回数据
```js
/**
 *  生成请求参数，数据请求完成直接返回
*/
const { offset, limit, total } = this
if (offset && offset > total) return
const movieIds = this.movieIds
  .slice(offset, offset + limit)
  .join()
const params = { params: { ...this.params, movieIds } }
/**
 *  getMovieInfoList函数见 [生成调用api]()
 *  1.  getMovieInfoList返回一个Promise
 *  2.1 判断 movieIds(初始化才存在)，赋值实例 movieIds， total，返回电影数据movieList
 *  2.2 movieIds不存在时，直接返回 coming
 *  3.  判断上述返回数据是否为空，不为空修改offset，添加数据到实例movieList数组
 * 
 *  @setImgSize 处理图片链接
 */
getMovieInfoList(params).then(data => {
  const { movieIds, movieList, coming, total } = data
  if (movieIds) {
    this.movieIds = movieIds
    this.total = total
    return movieList
  }
  return coming
}).then(data => {
  if (data.length) {
    this.offset += data.length
    this.movieList.push(...setImgSize(data))
    $state.loaded()
  } else {
    $state.complete()
  }
})
```
## 列表List组件
List组件在home两个子页面内通用，跳转的页面的路径不同，列表项复用Thumbnail组件
```html
// src\pages\home\components/list
<template>
  <ul>
    <router-link tag="li" :to="path + item.id"
                 v-for="(item, index) in list"
                 :key="index">
      <Thumbnail :movie="item" />
    </router-link>
  </ul>
</template>

<script >
import Thumbnail from '@/components/thumbnail'
export default {
  props: {
    path: String,
    list: Array
  },
  components: {
    Thumbnail
  }
}
</script>
```

## Thumbnail组件

