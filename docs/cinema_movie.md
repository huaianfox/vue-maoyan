## 电影- 影院页面架构预览
Cinema 目录在src\pages\cinema_movie\index.vue
-  根据电影选择电影院
-  NavBar组件使用[Navbar基础组件](home?id=navbar基础组件)
-  [MovieDetail](cinema_movie?id=MovieDetail组件)
-  [Date组件](cinema_movie?id=Date组件)[SelectPanel组件](select-panel)，组成一个更大select的组件
-   [NoData组件](cinema?id=NoData组件)，通用组件(cinema页面有解析)
-   [CinemaList组件](cinema?id=CinemaList组件)，通用组件(cinema页面有解析)

> 页面初始加载获取当前电影数据

> 页面初始加载获取当前电影的影院数据

> 页面初始加载获取当前城市选择影院的筛选的条件（影院区域划分、品牌、会员卡、影厅等），之后传给SelectPanel组件，点击SelectPanel组件选择筛选条件重新请求对应的接口数据
> cinema页面渲染数据存放在vuex的state.cinemas，只有在打开相关页面时才赋值，默认为空

```html
<template>
  <div class="page"
       :class="{fixed50: changeSelect}">
    <Navbar :title="detail.nm" />
    <MovieDetail v-show="detail.nm"
                 :detail="detail" />
    <div class="choose"
         ref="fixedConetnt"
         :class="{fixed: isFixed}">
      <Date :dates="dates" />
      <SelectPanel :filters="filters"
                   @change="changeSelection" />
    </div>
    <NoData v-if="empty"></NoData>
    <CinemaList :cinemaList="cinemas" />
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script >
import { getMovieDetail, getFilterCinemas } from '@/api'
import { getDay } from '@/util/date'
import Navbar from '@/components/navbar'
import MovieDetail from '@/components/movieDetail'
import Date from './components/date'
import SelectPanel from '@/components/selectPanel'
import NoData from '@/components/no-data'
import CinemaList from '@/components/cinemaList'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      movieId: 0,
      filters: {},
      dates: [],
      detail: {},
      offsetHeight: 0,
      isFixed: false,
      handleThottle: null,
      cinemaList: [],
      changeSelect: '',
      loaded: false
    }
  },
  computed: {
    ...mapState(['cinemas', 'city']),
    empty () {
      const list = this.cinemas || []
      return !list.length && this.loaded
    }
  },
  methods: {
    ...mapActions(['postMovie']),
    ...mapMutations(['changeFilter', 'emptyCinemaList']),
    infiniteHandler ($state) {
      this.postMovie({ movieId: this.movieId, updateShowDay: true, cityId: this.city.id }).then(data => {
        const { paging } = data
        this.loaded = true
        if (!this.dates.length) {
          this.dates = data.showDays.dates
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
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      this.isFixed = top > this.offsetHeight
    },
    changeSelection (name) {
      this.changeSelect = name
    }
  },
  mounted () {
    this.offsetHeight = this.$refs['fixedConetnt'].offsetTop
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    this.emptyCinemaList()
    const movieId = +this.$route.params.id
    this.movieId = movieId
    getMovieDetail({ params: { movieId } }).then(data => {
      this.detail = data.detailMovie
    })

    window.addEventListener('scroll', this.handleScroll)
    const day = getDay()
    getFilterCinemas({
      params: {
        movieId,
        day
      }
    }).then(data => {
      this.filters = data
    })
  },
  components: {
    Navbar,
    MovieDetail,
    Date,
    SelectPanel,
    CinemaList,
    NoData
  }
}
</script>
```
## API接口设计
### 接口分析

#### 获取电影详情信息接口

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 获取电影详情信息              |
| URL         | //m.maoyan.com/ajax/detailmovie |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| movieId   | Number | true  | 电影ID   |

!> 请求携带cookie中的ci值确定城市

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| detailMovie | Object  | 电影信息 |
##### 接口示例
> //m.maoyan.com/ajax/detailmovie?movieId=344869
```json
{
  detailMovie: {
    "cat": "剧情,喜剧,科幻",
    "commented": false,
    "cinemaId": 13054,
    "dir": "宁浩",
    "musicName": "疯狂的外星人",
    "nm": "疯狂的外星人",
    "musicStar": "梁龙;黄渤;沈腾",
    "src":  "中国大陆,美国",
    ...
  }
}
```

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
| URL         | //m.maoyan.com/ajax/movie?forceUpdate={times} |
| 格式        | JSON                             |
| HTTP METHOD | POST                              |

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

!> forceUpdate参数是当前时间戳，附加在url

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| cinemas | Array  | 影院列表 |
| day | string  | 日期 |
| movieId | string  | 电影ID |
| paging | Object  | 信息数量描述 |
| random | Number  | 随机数 |
| resId | string  | 时段 |
| showDays | Array  | 可供选择的日期 |

##### 接口示例
> http://m.maoyan.com/ajax/movie?forceUpdate=1551605577458

###### 请求参数
```json
{
  movieId: 344869,
  day: 2019-03-03,
  offset: 0,
  limit: 20,
  districtId: -1,
  lineId: -1,
  hallType: -1,
  brandId: -1,
  serviceId: -1,
  areaId: -1,
  stationId: -1,
  item: '', 
  updateShowDay: true,
  reqId: 1551605574284,
  cityId: 10,
}
```
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
  day: "2019-03-03",
  paging: {
    hasMore: true,
    limit: 20,
    offset: 0,
    total: 44
  }
  ....
}
```

## MovieDetail
纯展示组件，接受父组件props.detail数据渲染页面
```html
/**
* @addr src\components\movieDetail\index.vue
**/
<template>
  <div class="movie-detail">
    <div class="cover"
         :style="cover"></div>
    <div class="detail">
      <div class="poster">
        <img :src="poster"
             alt />
        <slot name="video" />
      </div>
      <div class="content">
        <div class="title ellipsis">{{detail.nm}}</div>
        <div class="p1 ellipsis">{{detail.enm}}</div>
        <div class="score ellipsis p1">
          <span class="num">{{detail.sc}}</span>
          <span class="p1">（{{num}}万人评）</span>
        </div>
        <div class="p1 ellipsis">{{detail.cat}}</div>
        <div class="p1 ellipsis">{{detail.src}}</div>
        <div class="p1 ellipsis">{{detail.pubDesc}}</div>
      </div>
      <router-link v-if="link"
                   :to="'/movie/'+ detail.id"
                   class="arrow-right">
        <i class="iconfont icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script >
import { setSize } from '@/util'

export default {
  data () {
    return {
      scores: [],
      fullStar: '//s0.meituan.net/bs/?f=react-canary:/img/star-full-new.png',
      half: '//s0.meituan.net/bs/?f=react-canary:/img/star-half-new.png',
      white: '//s0.meituan.net/bs/?f=react-canary:/img/star-empty-new.png'
    }
  },
  props: {
    detail: {
      type: Object,
      default () {
        return {}
      }
    },
    link: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cover () {
      return {
        backgroundImage: `url(${this.setSize('71.100')})`
      }
    },
    poster () {
      return this.setSize('148.208')
    },
    num () {
      return parseInt(this.detail.snum / 10000)
    },
    stars () {
      const sc = parseInt(this.detail.sc)
      const end = sc - this.detail.sc > 0.5 ? 1 : 0
      const start = 10 - sc
      return this.scores.slice(start - end, 6)
    }
  },
  created () {
    const { fullStar, half, white } = this
    const fullStars = [fullStar, fullStar, fullStar, fullStar, fullStar]
    const whites = [white, white, white, white, white]
    this.scores = fullStars.concat(half, whites)

    this.show = this.$route.name !== 'cinema_movie'
  },
  methods: {
    setSize (size) {
      return setSize(this.detail.img || '')(size)
    }
  }
}
</script>
```

## Date组件
Date组件接受父组件props.dates，选择日期操作changeFilter修改当前筛选条件，触发getCinemaList发出新的请求

```html
<template>
  <div class="days">
    <ul class="content">
      <li class="day"
          :class="currentIndex === index ? 'choosen': ''"
          v-for="(item, index) in dates"
          :key="item.date"
          @click="freshDate(item.date, index)">{{item.date}}</li>
    </ul>
  </div>
</template>

<script >
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    dates: Array
  },
  methods: {
    ...mapMutations(['changeFilter']),
    freshDate (day, index) {
      this.currentIndex = index
      this.changeFilter({ offset: 0, day: day, districtId: -1 })
      this.$store.dispatch('getCinemaList')
    }
  }
}
</script>
```

