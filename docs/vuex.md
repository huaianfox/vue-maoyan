## 引入vuex
> 按照[官方文档](https://vuex.vuejs.org/zh/) 创建应用所需相关文件

> 引入第三方持久化插件[store](https://www.npmjs.com/package/store),具体使用方法详见[官方文档](https://www.npmjs.com/package/store)

### state

> 初始化写入cookie

```js
import storage from 'store'
import filters from '@/config/filters'
const city = storage.get('city') || { nm: '淮安', id: 180 }
const cityList = storage.get('cityList')
const cityHistory = storage.get('cityHistory') || {}
const searchHistory = storage.get('searchHistory') || { movies: { data: [], type: 'movies' }, cinemas: { data: [], type: 'cinemas' } }
document.cookie = `ci=${city.id}%2C${encodeURI(city.nm)}`

export default {
  city,
  cityList,
  cityHistory,
  searchHistory,
  detailMovie: {},
  filters,
  cinemaListData: {},
  cinemas: []
}
```

### mutations
> filters.js定义了获取电影列表的默认参数 

```js
import storage from 'store'
import filters from '@/config/filters'

export default {
  changeCity (state, city) {
    state.city = city
    storage.set('city', city)
    document.cookie = `ci=${city.id}%2C${encodeURI(city.nm)}`
  },
  updateDetailMovie (state, movie) {
    const { id } = movie
    state.detailMovie = {
      ...state.detailMovie,
      [id]: movie
    }
    return state
  },
  addCityHistory (state, city) {
    state.cityHistory[city.id] = city
    storage.set('cityHistory', state.cityHistory)
  },
  changeDay (state, day) {
    state.day = day
  },
  changeFilter (state, item) {
    state.filters = {
      ...state.filters,
      ...item
    }
  },
  resetFilter (state) {
    state.filters = filters
  },
  initCinemaList (state, data) {
    const { filters } = state
    if (filters.offset === 0) {
      state.cinemaListData = data
      state.cinemas = data.cinemas
    } else {
      state.cinemas = [...state.cinemas, ...data.cinemas]
    }
  },
  emptyCinemaList (state) {
    state.cinemas = []
  },
  saveCityList (state, data) {
    state.cityList = data.letterMap
    storage.set('cityList', data.letterMap)
  },
  updateSearchHistory (state, history) {
    const list = {}
    list[history.type] = history
    state.searchHistory = {
      ...state.searchHistory,
      ...list
    }
    storage.set('searchHistory', state.searchHistory)
  }
}
```

### actions

```js
import { getCinemaList, postMovie, getCityList } from '@/api'

export default {
  updatedMovieDetail (ctx, movie) {
    ctx.commit('updateDetailMovie', movie)
  },
  changeCity (ctx, city) {
    ctx.commit('changeCity', city)
  },
  getCinemaList (ctx) {
    const { filters, city } = ctx.state
    if (filters.offset === 0) {
      ctx.commit('initCinemaList', {})
    }
    return getCinemaList({ params: { ...filters, cityId: city.id } }).then(data => {
      ctx.commit('initCinemaList', data)
      return data
    })
  },
  postMovie (ctx, payload) {
    const { filters } = ctx.state
    const time = Date.now()
    if (filters.offset === 0) {
      ctx.commit('initCinemaList', {})
    }
    return postMovie({
      params: {
        forceUpdate: time
      },
      data: {
        ...filters,
        ...payload
      }
    }).then(data => {
      ctx.commit('initCinemaList', data)
      return data
    })
  },
  getCityList (ctx) {
    getCityList().then(resp => {
      ctx.commit('saveCityList', resp.data)
    })
  }
}
```

## 城市选择页的vuex使用
### city主页
> [city主页](city)从vuex获取城市列表，当不存在数据时，触发action getCityList请求城市列表数据，返回的响应数据存入state并做持久存储

```js
  import { mapState, mapActions } from 'vuex'

  computed: {
    ...mapState(['cityList'])
  }

  methods: {
    ...mapActions(['getCityList'])
  }

  created () {
    this.cityList || this.getCityList()
  }

```
### 城市列表

> [城市列表](city?id=List组件)

```js
import { mapState, mapMutations } from 'vuex'

  computed: {
    ...mapState(['city', 'cityHistory'])
  }

  methods: {
    handleCityClick (city) {
      this.changeCity(city)
      this.addCityHistory(city)
      this.$router.replace('/')
    },
    ...mapMutations(['changeCity', 'addCityHistory'])
  }
```

## 影院列表的vuex使用
> [影院列表页面](cinema)，初始化时从vuex获取的cinemas为空，触发action异步操作getCinemaList加载数据，getCinemaList返回一个promise提供给组件进行后续操作,changeFilter修改请求所需的参数

```js
// @addr src\pages\cinema\index.vue

  import { mapActions, mapState, mapMutations } from 'vuex'

  computed: {
    ...mapState(['cinemas', 'city'])
  }
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
  }
```
## 影院-电影页面的vuex使用
> 具体使用方式类似[影院列表的vuex使用](vuex?id=影院列表的vuex使用)

```js
  import { mapActions, mapState, mapMutations } from 'vuex'

  computed: {
    ...mapState(['cinemas', 'city'])
  }

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
    }
  }  
```
## topbar组件的vuex使用

> 单纯的引用vuex中的数据

```js
 /**
  * @addr src\components\top\base.vue
  **/
  import { mapState } from 'vuex'

  computed: {
    ...mapState(['city'])
  }
```

## select-panel相关组件的vuex使用

> select-panel的相关子组件[Brand组件](select-panel?id=Brand组件)、[Region组件](select-panel?id=Region组件)、[Special组件](select-panel?id=Special组件)、[date组件](cinema_movie?id=date组件),操作类似，都是调用mapMutations的changeFilter修改请求参数，再调用action的getCinemaList重新请求数据


> 以下的brand组件使用，其他组件类似，具体参看源码

### brand组件

```js
  import { mapState, mapMutations } from 'vuex'

  computed: {
    ...mapState(['filters']),
    selectIndex () {
      return this.filters.brandId
    }
  }

  methods: {
    ...mapMutations(['changeFilter']),
    choose (brandId) {
      this.changeFilter({ brandId, offset: 0 })
      this.$store.dispatch('getCinemaList')
      this.$emit('close')
    }
  }

```