## 搜索页面架构预览
Search @addr src\pages\search\index.vue
-  NavBar组件使用[Navbar基础组件](vue-maoyan/home?id=navbar基础组件)
-  [ResultHistory组件](vue-maoyan/search?id=ResultHistory组件)  搜索历史组件
-  [Panel组件](vue-maoyan/search?id=Panel组件)  被ResultCinema组件、ResultCinema组件复用
-  [ResultCinema组件](vue-maoyan/search?id=ResultCinema组件) 搜索结果影院组件
-  [ResultCinema组件](vue-maoyan/search?id=ResultCinema组件) 搜索结果影院组件

> 页面初始从vuex获取历史搜索记录，从不同的路径来源进入搜索页面显示不同的历史记录，请求的参数也不同

```html
<template>
  <div class="page">
    <Navbar title="猫眼电影" />
    <div class="search-header">
      <div class="input-wrapper">
        <span class="iconfont icon-search"></span>
        <input v-model="searchText"
               @input="handleSearchInput"
               type="text"
               class="search-input"
               :placeholder="panel.name">
        <span v-if="searchText"
              @click="emptyText"
              class="iconfont icon-cancel"></span>
      </div>
      <div @click="handleCancelCilck"
           class="cancel">取消</div>
    </div>
    <ResultHistory v-if="!searchText"
                   @trigerSearch="trigerSearch"
                   :history="history" />
    <ResultMovie v-if="resultMovie.total"
                 :result="resultMovie"
                 :max="max" />
    <ResultCinema v-if="resultCinema.total"
                  :result="resultCinema"
                  :max="max" />
    <infinite-loading v-if="searching">
      <div class="loading"
           slot="spinner">Loading...</div>
    </infinite-loading>
  </div>
</template>

<script >
import Navbar from '@/components/navbar'
import { getSearch } from '@/api'
import ResultHistory from './components/history'
import ResultMovie from './components/result-movie'
import ResultCinema from './components/result-cinema'
import { mapState, mapMutations } from 'vuex'
import { uniqueArray } from '@/util'

export default {
  name: 'Search',
  data () {
    return {
      timer: null,
      searchText: '',
      searchtype: {
        movie: {
          type: -1,
          name: '搜电影、搜影院',
          title: 'movies'
        },
        cinema: {
          type: 2,
          name: '搜影院',
          title: 'cinemas'
        }
      },
      resultMovie: {},
      resultCinema: {},
      max: 3,
      searching: false
    }
  },
  watch: {
    searchText (value) {
      if (!value) {
        this.resultMovie = {}
        this.resultCinema = {}
      }
    }
  },
  computed: {
    ...mapState(['city', 'searchHistory']),
    cityId () {
      return this.city.id
    },
    panel () {
      const { searchtype, $route: { params } } = this
      const panel = params.searchtype || searchtype.movie
      return searchtype[panel]
    },
    history () {
      const { title } = this.panel
      return this.searchHistory[title]
    }
  },
  methods: {
    ...mapMutations(['updateSearchHistory']),
    handleSearchInput () {
      if (this.timer) return
      this.timer = setTimeout(() => {
        this.resultMovie = {}
        this.resultCinema = {}
        if (this.searchText) {
          this.history.data.unshift(this.searchText)
          this.history.data = uniqueArray(this.history.data)
          this.updateSearchHistory({
            ...this.history
          })
        }
        this.timer = null
        this.searching = true
        getSearch({
          params: {
            kw: this.searchText,
            cityId: this.cityId,
            style: this.panel.type
          }
        }).then(data => {
          const { cinemas, movies } = data
          this.panel.type === -1 && this.formatData(movies, 'resultMovie')
          this.formatData(cinemas, 'resultCinema')
          this.searching = false
        })
      }, 300)
    },
    handleCancelCilck () {
      this.$router.back()
    },
    emptyText () {
      this.searchText = ''
    },
    trigerSearch (val) {
      this.searchText = val
      this.handleSearchInput()
    },
    formatData (data, title) {
      if (!data) return
      const { list, total } = data
      this[title] = {
        list: total > this.max ? list.slice(0, this.max) : list,
        total
      }
    }
  },
  components: {
    Navbar,
    ResultHistory,
    ResultMovie,
    ResultCinema
  }
}
</script>
```

## API接口设计
### 接口分析

#### 搜索接口

| 信息        | 说明                       |
| :---------- | :------------------------- |
| 功能        | 获电影、影院等信息         |
| URL         | //m.maoyan.com/ajax/search |
| 格式        | JSON                       |
| HTTP METHOD | GET                        |

##### 请求参数
| 参数   | 类型   | 必选 | 说明                                              |
| :----- | :----- | ---- | ------------------------------------------------- |
| kw     | string | true | 搜索关键词                                        |
| cityId | Number | true | 城市ID                                            |
| stype  | Number | true | 搜索类型， -1显示 电影、影院等信息；2显示影院信息 |

> 根据进入搜索页面的来源， 从[首页](vue-maoyan/home)进入 stype= -1，从[影院](vue-maoyan/cinema)页面进入 stype= 2

##### 返回字段
| 字段    | 类型   | 说明                           |
| :------ | :----- | ------------------------------ |
| movies  | Object | 电影信息，根据请求的stype字段  |
| cinemas | Object | 影院信息 ，根据请求的stype字段 |

##### 接口示例
> http://m.maoyan.com/ajax/search?kw=%E6%B5%81%E6%B5%AA&cityId=30&stype=-1
```json
{
  "movies": {
    "list": [
      {
        "cat": "剧情,冒险,科幻",
        "dir": "郭帆",
        "nm": "流浪地球",
        "star": "吴京,屈楚萧,李光洁",
        ....
      },
      ...
    ],
    "total": 236,
    "type": 0
  }
}
```

## ResultHistory组件

历史组件,可以触发vuex的mapMutations方法updateSearchHistory删除更新历史记录，点击历史记录选项触发父组件trigerSearch方法请求数据，历史组件不从vuex直接获取数据，处于考虑该组件承担了渲染不同来源的搜索类型记录任务，在父组件处理完来源数据再传递给历史组件

```html
/**
* @addr src\pages\search\components\history.vue
**/
<template>
  <div class="result-history">
    <div class="history-item"
         v-for="(item, key) in history.data"
         :key="item+key">
      <div class="iconfont icon-time"></div>
      <div class="word ellipsis"
           @click="handleSearch(item)">{{item}}</div>
      <div class="del iconfont icon-delete"
           @click="handleDel(key)"></div>
    </div>
    <div class="hot"
         v-if="hot">
      <p class="word">热门搜索</p>
    </div>
  </div>
</template>

<script >
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  props: {
    history: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    hot () {
      return this.history.type === 'movies'
    }
  },
  methods: {
    ...mapMutations(['updateSearchHistory']),
    handleSearch (val) {
      this.$emit('trigerSearch', val)
    },
    handleDel (index) {
      const data = this.history.data.slice()
      data.splice(index, 1)
      this.updateSearchHistory({
        type: this.history.type,
        data
      })
    }
  }
}
</script>
```

##Panel组件

作为容器组件

```html
<template>
  <div class="result-wrapper">
    <h3 class="title">{{title}}</h3>
    <slot name="content" />
    <div class="more-result" v-if="tips">{{tips}}</div>
  </div>
</template>

<script >
export default {
  computed: {
  },
  props: {
    title: String,
    tips: String
  },
  components: {
  }
}
</script>

```



## ResultMovie组件

电影列表展示组件,复用了[movieitem组件](vue-maoyan/hot?id=movieitem组件)、[Panel组件](vue-maoyan/search?id=Panel组件) 

```html
/**
* @addr src\pages\search\components\result-movie.vue
**/
<template>
  <Panel title="电影/电视剧/综艺"
         :tips="tips">
    <div class="list"
         slot="content">
      <router-link v-for="item in result.list" :to="'/movie/'+item.id"
                   :key="item.id">
        <movie-item :movie="item">
          <div class="movie-info-item"
               slot="movie-info">
            <h4 class="ename line ellipsis">{{item.enm}}</h4>
            <p class="cate ellipsis">{{item.cat}}</p>
            <p class="release line">{{item.pubDesc}}</p>
          </div>

          <div class="movie-aside-item"
               slot="movie-aside-item">
            <div class="wish"
                 v-if="item.showst === 1"><span class="num">{{item.wish}}</span> 人想看</div>
            <div class="score"
                 v-if="item.globalReleased">
              <span v-if="item.sc"><span class="num">{{item.sc}}</span> 分</span>
              <span v-if="!item.sc"
                    class="no-sc">暂无评分</span>
            </div>
          </div>
        </movie-item>
      </router-link>

    </div>
  </Panel>
</template>

<script >
import Panel from './panel'
import MovieItem from '@/components/movie-item'

export default {
  computed: {
    tips () {
      const total = this.result.total || 0
      return total > this.max ? `查看全部${total}部影视剧` : ''
    }
  },
  props: {
    result: Object,
    max: Number
  },
  filters: {
    formatImg (img) {
      const ret = img || ''
      return ret.replace('w.h', '128.176')
    }
  },
  components: {
    Panel,
    MovieItem
  }
}
</script>
```

## ResultCinema组件
复用了[cinemaitem组件](vue-maoyan/cinema?id=cinemaitem组件)、[Panel组件](vue-maoyan/search?id=Panel组件)

```html
/**
* @addr src\pages\search\components\result-cinema.vue
**/
<template>
  <Panel title="影院"
         :tips="tips">
    <div class="list"
         slot="content">
      <cinema-item v-for="item in result.list"
                   :key="item.id"
                   :cinema="item">
      </cinema-item>
    </div>
  </Panel>
</template>

<script >
import Panel from './panel'
import CinemaItem from '@/components/cinema-item'

export default {
  computed: {
    tips () {
      const total = this.result.total || 0
      return total > this.max ? `查看全部${total}家电影院` : ''
    }
  },
  props: {
    result: Object,
    max: Number
  },
  components: {
    Panel,
    CinemaItem
  }
}
</script>
```