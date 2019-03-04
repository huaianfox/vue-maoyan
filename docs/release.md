## 页面架构
拆分两个组件[Expect](release?id=Expect组件) 和 [ComingGroup](release?id=ComingGroup组件)，ComingGroup组件内是两个接口获取数据（初始化和加载更多），也做了接口合并处理（具体处理流程详见[HOME之Hot:接口合并](hot?id=合并接口)）
```html
// @addr src\pages\home\children\release.vue
<template>
  <section class="inner">
    <Expect />
    <ComingGroup />
  </section>
</template>

<script>
import Expect from '../components/relaese-expect'
import ComingGroup from '../components/release-coming'

export default {
  name: 'Coming',
  data () {
    return {}
  },
  components: {
    Expect,
    ComingGroup
  }
}
</script>
```

## API接口设计
### 接口分析
[即将上映电影接口](release?id=即将上映电影接口)和[加载更多即将上映电影接口](release?id=加载更多即将上映电影接口)做了接口合并处理（具体处理流程详见[HOME之Hot:接口合并](hot?id=合并接口)）

#### 最受期待电影接口

接口使用详见 [ xpect组件](release?id=Expect组件)

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 初始化获取电影信息               |
| URL         | //m.maoyan.com/ajax/mostExpected |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| token  | String | false | 登录之后的凭证             |
| ci     | Number | true  | 城市ID                     |
| limit  | Number | true  | 一次请求的最大数量，默认10 |
| offset | Number | true  | 位移，初始默认0            |

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| coming | Array  | 电影列表（默认一次返回10条） |
| paging | Object | 数据返回描述                 |

##### 接口示例
> //m.maoyan.com/ajax/mostExpected?ci=1&limit=10&offset=0&token=
```json
{
  "coming": [
    {
      comingTitle: "3月8日 周五",
      id: 341139,
      img: "http://p0.meituan.net/w.h/movie/034069fc367db8a7d9644717b416cc2c332883.jpg",
      nm: "惊奇队长",
      wish: 382778,
      wishst: 0
    }
  ],
  paging: {
    "hasMore": true,
    "limit": 10,
    "offset": 0,
    "total": 56
  }
}
```

#### 即将上映电影接口

接口使用详见 [ComingGroup组件](release?id=ComingGroup组件)

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 初始化即将上映电影接口               |
| URL         | //m.maoyan.com/ajax/comingList |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| token  | String | false | 登录之后的凭证             |
| ci     | Number | true  | 城市ID                     |
| limit  | Number | true  | 一次请求的最大数量，默认10 |

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| coming | Array  | 电影列表（默认一次返回10条） |
| movieIds | Array | 所有即将上映电影ID，[加载更多电影接口](release?id=即将上映电影加载更多接口)依赖于此                 |

##### 接口示例
> //m.maoyan.com/ajax/comingList?ci=1&token=&limit=10
```json
{
  "coming": [
    {
      comingTitle: "3月8日 周五",
      globalReleased: false,
      id: 341139,
      img: "http://p0.meituan.net/w.h/movie/034069fc367db8a7d9644717b416cc2c332883.jpg",
      nm: "惊奇队长",
      wish: 382778,
      showInfo: "2019-03-07 下周四上映",
      wishst: 0,
      ....
    }
  ],
  movieIds: [
    [1250341, ...], // 100
    [23465656, ...] // 100
  ]
}
```

#### 加载更多即将上映电影接口

接口使用详见[ComingGroup组件](release?id=ComingGroup组件)

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 初始化即将上映电影接口               |
| URL         | //m.maoyan.com/ajax/moreComingList |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| token  | String | false | 登录之后的凭证             |
| ci     | Number | true  | 城市ID                     |
| limit  | Number | true  | 一次请求的最大数量，默认10 |
| movieIds  | String | true  | 电影ID列表，字符串形式 |

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| coming | Array  | 电影列表（默认一次返回10条） |

##### 接口示例
> //m.maoyan.com/ajax/moreComingList?ci=1&token=&limit=10&movieIds=1257071%2C1262397%2C1216383%2C1261959%2C1220710%2C1212353
```json
{
  "coming": [
    {
      comingTitle: "3月8日 周五",
      globalReleased: false,
      id: 341139,
      img: "http://p0.meituan.net/w.h/movie/034069fc367db8a7d9644717b416cc2c332883.jpg",
      nm: "惊奇队长",
      wish: 382778,
      showInfo: "2019-03-07 下周四上映",
      wishst: 0,
      ....
    },
    ...
}
```

## Expect组件
```html
/**
* @addr src\pages\home\components\relaese-expect.vue
*/
<template>
  <div class="most-expected">
    <p class="title">近期最受期待</p>
    <div class="most-expected-wrapper"
         v-show="expectList.length">
      <ul class="most-expected-list"
          v-infinite-scroll="loadMoreMostExpected"
          infinite-scroll-disabled="expectLoding"
          infinite-scroll-distance="20">
        <router-link class="movie-item"
                     tag="li"
                     v-for="(item, key) in expectList"
                     :to="'movie/' + item.id"
                     :key="key">
          <div class="poster">
            <img class="img"
                 :src="item.img"
                 onerror="this.style.visibility='hidden'" />
            <span class="wish">{{item.wish}} 人想看</span>
          </div>
          <h5 class="title">{{item.nm}}</h5>
          <p class="date">{{item.comingTitle}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script >
import { getMostExpected } from '@/api'
import { setImgSize } from '@/util'
export default {
  name: 'relaese-expect',
  data () {
    return {
      expectLoding: false,
      expectList: [],
      expectedConfig: {
        ci: 80,
        limit: 10,
        offset: 0,
        token: '',
        total: 0,
        hasMore: true
      }
    }
  },
  methods: {
    loadMoreMostExpected () {
      const expectedConfig = this.expectedConfig
      const { hasMore, total, ...params } = expectedConfig
      if (!hasMore) {
        this.expectLoding = false
        return
      }
      getMostExpected({ params }).then(data => {
        const { coming, paging } = data
        expectedConfig.total = paging.total
        expectedConfig.hasMore = paging.hasMore
        expectedConfig.offset += coming.length
        const expectList = setImgSize(coming, '170.230')
        this.expectList.push(...expectList)
        this.expectLoding = false
      })
    },
  }
}
</script>
```

## ComingGroup组件
接口合并流程详见[HOME之Hot:接口合并](hot?id=合并接口), ComingGroup组件复用了[MovieItem组件](id=MovieItem组件)
```html
/**
* @addr src\pages\home\components\relaese-comming.vue
*/
<template>
  <div class="comming-group">
    <div class="movie-group"
         v-for="item in comingList"
         :key="item.comingTitle">
      <p class="group-date">{{item.comingTitle}}</p>
      <div class="list-wrap">
        <movie-list :path='path'
                    :list='item.data' />
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more">哦，没有更多电影了</div>
    </infinite-loading>
  </div>
</template>

<script >
import MovieList from './movie-list'
import { getComingListAction } from '@/api'
import { setImgSize } from '@/util'
export default {
  data () {
    return {
      path: 'movie/',
      comingList: {},
      comingConfig: {
        ci: 180,
        token: '',
        limit: 10,
        offset: 0,
        total: 0,
        movieIds: []
      }
    }
  },
  methods: {
    infiniteHandler ($state) {
      const comingConfig = this.comingConfig
      const { offset, total, movieIds, limit, ...params } = comingConfig
      const isFirst = offset === 0
      const getList = getComingListAction(isFirst)
      if (offset && offset >= total) return
      const queryMovieIds = movieIds.slice(offset, limit + offset).join()

      getList({
        params: { movieIds: queryMovieIds, ...params, limit }
      }).then(data => {
        const { coming, movieIds } = data
        if (movieIds) {
          comingConfig.movieIds = movieIds.flat()
          comingConfig.total = movieIds.length
        }
        return coming
      }).then(list => {
        if (list.length) {
          comingConfig.offset += list.length
          const cominglist = setImgSize(list)
          this.divideList(cominglist)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    divideList (list) {
      list.forEach(item => {
        const rt = item.rt
        if (!this.comingList[rt]) {
          this.$set(this.comingList, rt, {
            comingTitle: item.comingTitle,
            data: []
          })
        }
        const data = this.comingList[rt].data
        this.$set(this.comingList[rt], 'data', [...data, item])
      })
    }
  },
  components: {
    MovieList
  }
}
</script>
```