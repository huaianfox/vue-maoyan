## 影院页架构预览
Cinema 目录在@addr src\pages\cinema\index.vue
-  NavBar组件使用[Navbar固定组件](home?id=navbar固定组件)
-  [TopBar组件](cinema?id=TopBar组件)基于[Topbar基础组件](home?id=通用topbar组件)，二次开发
-  [SelectPanel组件](select-panel)，是通用组合组件,根据功能划分成多个小组件，最后组合暴露一个接口
-   [NoData组件](cinema?id=NoData组件)，通用组件
-   [CinemaList组件](cinema?id=CinemaList组件)，通用组件

> 页面初始加载获取当前城市选择影院列表，默认的筛选条件请求

> 页面初始加载获取当前城市选择影院的筛选的条件（影院区域划分、品牌、会员卡、影厅等），之后传给SelectPanel组件，点击SelectPanel组件选择筛选条件重新请求对应的接口数据

> cinema页面渲染数据存放在vuex的state.cinemas，只有在打开相关页面时才赋值，默认为空


```html
<template>
  <div class="panel">
    <NavBar title="影院" />
    <TopBar />
    <SelectPanel class="select-wrapper"
                 :filters="filters" />
    <section class="list">
      <NoData v-if="empty" ></NoData>
      <CinemaList class="cinemas"
                  :cinemaList="cinemas" />
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </section>
  </div>
</template>

<script>
import TopBar from './components/top'
import NavBar from '@/components/navbar/fixed'
import SelectPanel from '@/components/selectPanel'
import CinemaList from '@/components/cinemaList'
import NoData from '@/components/no-data'
import { getFilterCinemas } from '@/api'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Cinema',
  data () {
    return {
      filters: {}
    }
  },
  computed: {
    ...mapState(['cinemas', 'city']),
    empty () {
      const { cinemas } = this
      return cinemas ? !cinemas.length : false
    }
  },
  methods: {
    ...mapActions(['getCinemaList']),
    ...mapMutations(['changeFilter']),
    infiniteHandler ($state) {
      this.getCinemaList().then(data => {
        const { paging } = data
        if (paging.total === 0) {
          this.empty = true
        }
        if (paging.hasMore) {
          this.changeFilter({
            offset: paging.offset + paging.limit
          })
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  },
  created () {
    getFilterCinemas({ params: { ci: this.city.id } }).then(data => {
      this.filters = data
    })
  },
  components: {
    NavBar,
    TopBar,
    SelectPanel,
    CinemaList,
    NoData
  }
}
</script>
```
> 根据返回的接口数据paging.total值来判断是新接口还是加载更多数据，请求操作getCinemaList是vuex的一个action，在cinema页面内主动调用和SelectPanel组件触发，返回一个Promise给调用组件，进行后续修改下次请求条件等操作

> cinema页面筛选条件存放在vuex的state.filters，只有在提交Mutation的changeFilter方法才修改，只有在相关页面才触发，离开影院等页面重置默认条件

> [SelectPanel组件](select-panel)内操作，触发changeFilter会修改state.filters条件，清空vuex的state.cinemas，迫使页面根据新的筛选条件发出请求重新渲染数据

```js
this.getCinemaList().then(data => {
  const { paging } = data
  if (paging.total === 0) {
    this.empty = true
  }
  if (paging.hasMore) {
    this.changeFilter({
      offset: paging.offset + paging.limit
    })
    $state.loaded()
  } else {
    $state.complete()
  }
})
```

## API接口设计
### 接口分析

#### 筛选电影院条件接口

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 获取电影详情信息              |
| URL         | //m.maoyan.com/ajax/filterCinemas |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| movieId   | Number | true  | 电影ID   |
| day   | String | true  | 默认当前日期，示例：2019-03-03   |

!> 请求携带cookie中的ci值确定城市

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| brand | Object  | 品牌 |
| district | Object  | 行政区 |
| hallType | Object  | 影厅 |
| service | Object  | 会员service |
| subway | Object  | 地铁 |
| timeRanges | Object  | 时段 |

##### 接口示例
> //m.maoyan.com/ajax/filterCinemas?movieId=344869&day=2019-03-03

```json
{
  brand: {
    "name": "品牌",
    "subItems": [
      {
        "count": 110,
        "id": -1,
        "name": "全部"
      },
      {
        "count": 7,
        "id": 102642,
        "name": "万达影城"
      },
      ....
    ]
  },
  ....
}
```

#### 获取影院接口

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 获取电影详情信息              |
| URL         | //m.maoyan.com/ajax/cinemaList |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| movieId   | Number | true  | 电影ID   |
| day   | String | true  | 默认当前日期，示例：2019-03-03   |
| offset   | Number | true  | 初始0   |
| limit   | Number | true  | 初始20   |
| districtId   | Number | true  | 地区,默认 -1   |
| lineId   | Number | true  | 地铁线id，默认 -1   |
| hallType   | Number | true  | 影厅类型，默认 -1   |
| brandId   | Number | true  | 品牌ID，默认 -1   |
| serviceId   | Number | true  | serviceId，默认 -1   |
| areaId   | Number | true  | areaId，具体地址，默认 -1   |
| stationId   | Number | true  | 地铁站ID，默认 -1   |
| item   | Number | false  |    |
| updateShowDay   | Boolean | true  | 是否返回可供选择的日期,第一请求true，加载更多false   |
| reqId   | Number | false  |    |
| cityId   | Number | true  |  城市ID  |

!> 默认参数-1，全部

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| cinemas | Array  | 影院列表 |
| ct_pois | Array  | 日期 |
| paging | Object  | 信息数量描述 |
| resId | string  | 时段 |

##### 接口示例
> http://m.maoyan.com/ajax/cinemaList?day=2019-03-03&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1551607671268&cityId=10

###### 返回字段
```json
{
  cinemas: [
    {
      addr: "青浦区盈港东路7808号宝龙广场4楼",
      distance: "7km",
      id: 25911,
      mark: 0,
      nm: "自由人影城(上海青浦宝龙广场店)",
      ...
    }
  ],
  paging: {
    hasMore: true,
    limit: 20,
    offset: 0,
    total: 44
  }
  ....
}
```


## TopBar组件

TopBar组件在[基础组件](home?id=navbar基础组件)的基础上，增加了一个搜索页面入口
```html
/**
* @addr src\pages\cinema\components\top.vue
**/
<template>
  <BaseTopBar :styles="bg">
    <router-link :to="{name: 'search', params: {searchType: 'cinema'}}"
                 solt="search"
                 class="movie-search iconfont icon-search">
      搜索影院
    </router-link>
  </BaseTopBar>
</template>

<script >
import BaseTopBar from '@/components/topbar/base'

export default {
  data () {
    return {
      bg: {
        background: '#f5f5f5'
      }
    }
  },
  components: {
    BaseTopBar
  }
}
</script>
```

## NoData组件
纯展示组件，接受父组件的props.title渲染
```html
/**
* @addr src\components\no-data.vue
**/
<template>
  <div class="no-data">
    <div class="content">
      <img src="../../assets/img/nothing.png"
           alt="">
      <p class='no-cinema-tip'>{{title}}</p>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    title: {
      type: String,
      default: '暂无符合条件的影院'
    }
  }
}
</script>
</script>
```

## CinemaList组件

```html
/**
* @addr src\components\cinemaList.vue
**/
纯展示组件，接受父组件的props.cinemaList渲染
<template>
  <div class="cinema-wrapper"
       v-show="cinemaList.length">
    <router-link :to="{name: 'shows', params: {id: cinema.id}}"
                 class="cinema-info"
                 v-for="(cinema) in cinemaList"
                 :key="cinema.id">
      <div class="cinema-title">
        <p class="ellipsis">{{cinema.nm}}</p>
        <span class="price">
          {{cinema.sellPrice}}
          <span>元起</span>
        </span>
      </div>
      <div class="cinema-address">
        <p class="cinema-address-info ellipsis">{{cinema.addr}}</p>
        <span class="distance">{{cinema.distance}}</span>
      </div>
      <div class="cinema-label ellipsis"></div>
      <div class="cinema-discount ellipsis"
           v-if="cinema.promotion.cardPromotionTag">
        <span class="cinema-discount-label">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
               alt />
        </span>
        {{cinema.promotion.cardPromotionTag}}
      </div>
    </router-link>
  </div>
</template>

<script >
export default {
  name: 'cinema-list',
  props: {
    cinemaList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
```