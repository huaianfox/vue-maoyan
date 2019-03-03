## 影院-电影页面架构预览
Cinema 目录在src\pages\shows\index.vue
-  根据电影院选择电影
-  NavBar组件使用[Navbar基础组件](home?id=navbar基础组件)
-  [Info组件](shows?id=Info组件)
-  [Swiper组件](shows?id=Swiper组件) 根据页面功能划分多个小组件组成
-  [Deal组件](shows?id=Deal组件)，

> 页面初始加载获取当前影院数据

```html
<template>
  <div class="pages">
    <NavBar :title="cinemaData.nm" />
    <Info :info="cinemaData"
          v-if="cinemaData" />
    <Swiper :list="movieList"
            v-if="movieList.length"
            :vip="vipInfo" />
    <Deal :list="list"
          v-if="list.length" />
    <infinite-loading v-if="!isLoad"
                      @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script >
import NavBar from '@/components/navbar'
import { getCinemaDetail } from '@/api'
import Info from './components/info'
import Deal from './components/deal'
import Swiper from './components/swiper'
export default {
  data () {
    return {
      detail: {},
      isLoad: false
    }
  },
  computed: {
    cinemaData () {
      return this.detail.cinemaData || {}
    },
    list () {
      const dealList = this.detail.dealList
      const ret = (dealList && dealList.dealList) || []
      return ret
    },
    movieList () {
      const showData = this.detail.showData
      return showData ? showData.movies : []
    },
    vipInfo () {
      const showData = this.detail.showData
      const vips = showData ? showData.vipInfo : []
      return vips ? vips[0] : {}
    }
  },
  methods: {
    infiniteHandler ($state) {
      const { id } = this.$route.params
      getCinemaDetail({ params: { cinemaId: id } }).then(data => {
        this.detail = data
        this.isLoad = true
        $state.complete()
      })
    }
  },
  components: {
    NavBar,
    Info,
    Swiper,
    Deal
  }
}
</script>
```

## API接口设计
### 接口分析

#### 影院的电影列表、优惠等信息接口

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 获取影院的电影列表等信息              |
| URL         | //m.maoyan.com/ajax/cinemaDetail |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| cinemaId  | Number | true | 影院ID             |
| movieId   | Number | false  | 电影ID，如果有此参数，页面直接轮播展示对应的电影   |

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| cinemaData | Object  | 影院信息 |
| dealList | Object | 套餐信息                 |
| membercardDetail | String |                  |
| movieIndex | Number |                  |
| showData | Object |   电影列表信息               |
| stone | Object |   字体信息               |

##### 接口示例
> //m.maoyan.com/ajax/cinemaDetail?cinemaId=13054&movieId=247295
```json
{
  channelId: 4,
  cinemaData: {
    "addr": true,
    "sell": true,
    "cinemaId": 13054,
    "lat": 39.94469,
    "lng": 116.27137,
    "nm": "万画影城(四季青店)",
    "shopId": 23325693
  },
  dealList: {
    activity: {...},
    dealList: [...],
    divideDealList: [...],
    showCount: 6,
    stid: "1585401697750747136",
    totalCount: 6,
  },
  membercardDetail: "/membercard/detail/",
  movieIndex: 0,
  showData: {
    cinemaId: 13054
    cinemaName: "万画影城(四季青店)"
    cityCardInfo: [],
    modeSwitchThreshold: 5,
    movies: [....],
    poiId: 41066531,
    selectedMovieSeq: 2,
    sell: true,
    vipInfo: [...]
  },
  stone: {... }
}
```

## Info组件
纯展示组件，接受父组件props.info数据渲染页面
```html
/**
* @addr src\components\movieDetail\index.vue
**/
<template>
  <div class="cinema-info">
    <div class="info">
      <p class="title ellipsis">{{info.nm}}</p>
      <p class="addr ellipsis">{{info.addr}}</p>
    </div>
    <div class="location">
      <i class="iconfont icon-pos"></i>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
```

## Deal组件
Deal组件接受父组件props.list，对数据进行过滤

```html
/**
* @addr src\pages\shows\components\deal.vue
**/
<template>
  <section class="deal">
    <header class="title">影院超值套餐</header>
    <div class="deal-item"
         v-for="item in list"
         :key="item.title">
      <img :src="item.imageUrl | format"
           alt="">
      <span class="tag"
            :class="item.cardTagType"
            v-if="item.cardTag">{{item.cardTag}}</span>
      <div class="item-info">
        <p class="detal-item-title">{{item.title}}</p>
        <p class="sell-num">{{item.curNumberDesc}}</p>
        <p class="buy">
          <router-link class="buy-link"
                       to="/buy"> 去购买</router-link>
        </p>
        <p class="price">￥<span class="num">{{item.price}}</span></p>
      </div>
    </div>
  </section>
</template>

<script >
import { getImg } from '@/util'

export default {
  data () {
    return {
      tags: {
        1: 'new'
      }
    }
  },
  props: {
    list: Array
  },
  filters: {
    format (value) {
      if (!value) return ''
      return getImg('92.92')(value)
    },
    formatTag (value) {
      if (!value) return ''
      return this.tags[value]
    }
  },
  methods: {
    getImg (img) {
      return getImg('92*92')(img)
    }
  }
}
</script>
```

## Swiper组件
接受父组件props.list,props.vip信息，过滤数据在派发给下级组件

根据页面功能划分了多个组件组成，核心依赖[vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)

- 滑动电影海报或者滑动列表，联动下方切换对应是电影日期选择和电影播放时间表、座位等信息。
- 在此划分了[Seat组件](shows?id=Seat组件)渲染电影播放时间、场次等信息、[Discount组件](shows?id=Discount组件)渲染优惠信息

```html
/**
* @addr src\pages\shows\components\swiper.vue
**/
<template>
  <section class="swipe-wrapper">
    <section class="cinema-nav">
      <div class="post-bg"
           :style="{background: backgroundImg}"></div>
      <swiper ref="cinemaSwiper"
              :options="swiperOption">
        <swiper-slide v-for="(item, index) in list"
                      :key="item.img">
          <div class="poster"
               :class="{active: currentIndex === index}">
            <img :src="item.img| formatImg"
                 alt>
          </div>
        </swiper-slide>
      </swiper>
    </section>
    <div class="movie-info">
      <header class="movie-title">
        <span class="title">{{info.nm}}</span>
        <span class="grade">
          <em>{{tips.num}}</em>
          {{tips.name}}
        </span>
      </header>
      <p class="movie-desc">{{info.desc}}</p>
    </div>
    <Seat :info="info">
      <Discount slot="vip-tips"
                v-if="vip.tag"
                :info="vip" />
    </Seat>
  </section>
</template>

<script >
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Seat from './seat'
import Discount from './discount'
import { getImg } from '@/util'
export default {
  data () {
    return {
      currentIndex: 0,
      swiperOption: {
        delay: 2500,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slideToClickedSlide: true,
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 5
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.cinemaSwiper
    },
    backgroundImg () {
      const list = this.list[this.currentIndex] ? this.list[this.currentIndex] : {}
      const img = list.img ? list.img.replace('w.h', '140.208') : ''
      return `url(${img})`
    },
    info () {
      return this.list[this.currentIndex] || {}
    },
    tips () {
      const info = this.info
      if (info.sc === '0.0') {
        return {
          num: info.wish,
          name: '人想看'
        }
      }
      return {
        num: info.sc,
        name: '分'
      }
    }
  },
  props: {
    list: Array,
    vip: Object
  },
  filters: {
    formatImg (value) {
      if (!value) return ''
      return getImg('92.92')(value)
    }
  },
  components: {
    swiper,
    swiperSlide,
    Seat,
    Discount
  },
  created () {
    this.$nextTick(() => {
      const vm = this
      this.swiper.$on('slideChangeTransitionStart', function () {
        vm.currentIndex = this.swiper.realIndex
      })
    })
  }
}
</script>
```

### Seat组件
数据展示组件，根据选择不同日期展示电影播放时间、价格、优惠等信息，当前日期没有场次时，渲染明天的日期入口
```html
/**
* @addr src\pages\shows\components\seat.vue
**/
<template>
  <div class="seat">
    <nav class="dates-wrap">
      <ul class="dates">
        <li class="date-item"
            v-for="(item, index) in list"
            :key="item.showDate"
            @click="switchDate(index)"
            :class="{active: currentIndex === index}">
          <span class="date-title">{{item.dateShow}}</span>
        </li>
      </ul>
    </nav>
    <slot name="vip-tips" />
    <ul v-if="showList.length"
        class="seat-list">
      <li class="seat-item"
          v-for="item in showList"
          :key="item.seqNo">
        <div class="tag-wrapper"
             v-if="item.zeroFlag">
          <div class="zeroFlag">{{item.zeroFlag}}</div>
        </div>
        <div class="item-content">
          <div class="time">
            <div class="begin">{{item.tm}}</div>
            <div class="end">{{item.end}} 散场</div>
          </div>
          <div class="info">
            <div class="lan">{{item.lang + item.tp}}</div>
            <div class="hall">{{item.th}}</div>
          </div>
          <div class="price">
            <div class="sell">￥ <span class="stonefont"
                    v-html="item.sellPr"></span>
            </div>
            <div class="vipPrice"
                 v-if="item.vipPriceName">
              <span class="icon">{{item.vipPriceName}}</span>
              <span class="num">￥{{item.vipPrice}}</span>
            </div>
            <div class="extraDesc"
                 v-if="item.extraDesc">{{item.extraDesc}}</div>
          </div>
          <div class="buy">
            <div class="buy-btn">购票</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="no-seat"
         v-if="!showList.length">
      <div class="icon"></div>
      <div class="text">{{notes}}</div>
      <div v-if="nextDate"
           class="next-date"
           @click="switchDate(currentIndex + 1)">点击查看{{nextDate}}场次</div>
    </div>
  </div>
</template>

<script >
export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showList () {
      const dur = this.info.dur
      const shows = this.list[this.currentIndex]
      const plist = shows ? shows.plist.map(item => {
        const start = item.dt.replace('-', '//') + ' ' + item.tm
        const times = +new Date(start) + dur * 60 * 1000
        const date = new Date(times)
        return { ...item, end: `${date.getHours()}:${date.getMinutes()}` }
      }) : []
      return plist
    },
    list () {
      return this.info.shows || []
    },
    nextDate () {
      const shows = this.list[this.currentIndex + 1]
      return shows ? shows.showDate : ''
    },
    notes () {
      return this.info.globalReleased ? '今日场次已映完' : '影片未上映'
    }
  },
  methods: {
    switchDate (index) {
      this.currentIndex = index
    }
  }
}
</script>
```

### Discount组件
纯展示组件
```html
/**
* @addr src\pages\shows\components\discount.vue
**/
<template>
  <div class="discount">
    <div class="vip-tips">
      <div class="label">{{info.tag}}</div>
      <div class="label-text">{{info.title}}</div>
      <div class="process">{{info.process}}</div>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    info: Object
  }
}
</script>
```