## 城市选择结构
city @addr src\pages\city\index.vue
相对于原页面作了少许改动，增加了顶部导航栏
-  NavBar组件使用[Navbar基础组件](home?id=navbar基础组件)
-  [List组件](city?id=List组件)
-  [Alphabet组件](cinema_movie?id=Alphabet组件)

```html
/**
*  @addr src\pages\city\index.vue
**/
<template>
  <div class="page">
    <NavBar title="城市列表"
            :fixed="true" />
    <List :letterMap="letterMap"
          :letter="letter" />
    <Alphabet :letterMap="letterMap"
              @changePanel="handleLetterChange" />
  </div>
</template>

<script >
import NavBar from '@/components/navbar'
import List from './components/list'
import Alphabet from './components/alphabet'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      letter: ''
    }
  },
  computed: {
    ...mapState(['cityList']),
    letterMap () {
      return this.cityList || {}
    }
  },
  components: {
    List,
    NavBar,
    Alphabet
  },
  created () {
    this.cityList || this.getCityList()
  },
  methods: {
    ...mapActions(['getCityList']),
    handleLetterChange (letter) {
      this.letter = letter
    }
  }
}
</script>
```
## API接口设计
### 接口分析
此处api数据取自猫眼电影pc端的数据，存于本地获取，获取之后作持久化处理
#### 获取城市列表

| 信息        | 说明                             |
| :---------- | :------------------------------- |
| 功能        | 获取电影详情信息              |
| URL         | /assets/json/cities.json |
| 格式        | JSON                             |
| HTTP METHOD | GET                              |

##### 请求参数
| 参数   | 类型   | 必选  | 说明                       |
| :----- | :----- | ----- | -------------------------- |
| -   | - | -  | -  |

##### 返回字段
| 字段   | 类型   | 说明                         |
| :----- | :----- | ---------------------------- |
| geoCity | Object  | 默认城市列表 |
| letterMap | Object  | 按字母划分的城市列表 |


##### 接口示例
> /assets/json/cities.json

```json
{
  geoCity: {
    id: 180
    nm: "淮安"
    py: "huaian"
  },
  letterMap: {
    A: [
      {id: 150, nm: "阿拉善盟", py: "alashanmeng"},
      {id: 151, nm: "鞍山", py: "anshan"},
      ...
    ],
    ...
  }
}
```
## List组件
列表组件内引用了一个[Panel组件](city?id=panel组件)和[better-scroll插件](https://ustbhuangyi.github.io/better-scroll/#/)

``` html
/***
*******  @addr src\pages\city\components\list.vue
**/
<template>
  <div class="list"
       ref="wrapper">
    <div class="content">
      <Panel title="定位城市">
        <div class="item">{{city.nm}}</div>
      </Panel>
      <Panel title="最近访问城市">
        <div class="item"
             v-if="!hasHistory">暂无</div>
        <div class="item"
             v-for="(item, key) in cityHistory"
             @click="handleCityClick(item)"
             :key="key">
          {{item.nm}}
        </div>
      </Panel>
      <Panel title="热门城市">
        <div class="item"
             v-for="city in cities"
             :key="city.id"
             @click="handleCityClick(city)">{{city.nm}}</div>
      </Panel>
      <Panel class="cities-panel"
             v-for="(cities, key) in letterMap"
             :key="key"
             :title="key"
             :ref="key">
        <!-- <p class="top" :ref="key"></p> -->
        <div class="city-name"
             v-for="city in cities"
             :key="city.id"
             @click="handleCityClick(city)">{{city.nm}}</div>
      </Panel>
    </div>
  </div>
</template>

<script >
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
import Panel from './base'

export default {
  data () {
    return {
      cities: [
        { id: '10', nm: '上海' },
        { id: '1', nm: '北京' },
        { id: '20', nm: '广州' },
        { id: '30', nm: '深圳' },
        { id: '57', nm: '武汉' },
        { id: '40', nm: '天津' },
        { id: '42', nm: '西安' },
        { id: '55', nm: '南京' },
        { id: '50', nm: '杭州' },
        { id: '45', nm: '重庆' }
      ]
    }
  },
  props: {
    letterMap: Object,
    letter: String
  },
  components: {
    Panel
  },
  computed: {
    ...mapState(['city', 'cityHistory']),
    hasHistory () {
      return Object.keys(this.cityHistory).length
    }
  },
  watch: {
    letter () {
      if (this.letter) {
        const elem = this.$refs[this.letter][0].$el
        this.scroll.scrollToElement(elem)
      }
    }
  },
  methods: {
    handleCityClick (city) {
      this.changeCity(city)
      this.addCityHistory(city)
      this.$router.replace('/')
    },
    ...mapMutations(['changeCity', 'addCityHistory'])
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  }
}
</script>
```
### Panel组件
展示组件，划分List组件内的区块
``` html
/***
*******  @addr src\pages\city\components\panel.vue
**/
<template>
  <section class="city-panel">
    <header class="title">{{title}}</header>
    <div class="main">
      <slot></slot>
    </div>
  </section>
</template>

<script >
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
```
### List组件逻辑
> 从vuex state获取当前城市和历史城市访问记录,点击列表中的任意城市，触发mapMutations中的changeCity切换当前城市，addCityHistory增加历史访问记录，同时跳转到首页

```js
import { mapState, mapMutations } from 'vuex'

    computed: {
    ...mapState(['city', 'cityHistory']),
    hasHistory () {
      return Object.keys(this.cityHistory).length
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

## Alphabet组件
> 业务逻辑详见[Alphabet组件逻辑](city?id=Alphabet组件逻辑)

```html
/**
****** @addr src\pages\city\components\alphabet.vue
**/
<template>
  <ul class="alphabet">
    <li class="letter"
        v-for="(cities, letter) in letterMap"
        :key="letter"
        :ref="letter"
        @click="handleLetterClick"
        @touchstart="handleTouchstart"
        @touchmove="handleTouchmove"
        @touchend="handleTouchend">{{letter}}</li>
  </ul>
</template>

<script >
export default {
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
  props: {
    letterMap: Object
  },
  computed: {
    letters () {
      const letters = Object.keys(this.letterMap)
      return letters
    }
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('changePanel', e.target.innerText)
    },
    handleTouchstart () {
      this.touchStatus = true
    },
    handleTouchmove (e) {
      if (this.touchStatus) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('changePanel', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchend () {
      this.touchStatus = false
    }
  }
}
</script>
```

### Alphabet组件逻辑

> 点击字母，List列表滑动到对应的城市区块

```js
  // Alphabet组件
  handleLetterClick (e) {
    this.$emit('changePanel', e.target.innerText)
  }
  // city父组件
  // <List :letterMap="letterMap" :letter="letter" />
  // <Alphabet :letterMap="letterMap"  @changePanel="handleLetterChange" />
  handleLetterChange (letter) {
    this.letter = letter
  }

  // List 组件监听 letter,触发better-scroll滑动
    letter () {
      if (this.letter) {
        const elem = this.$refs[this.letter][0].$el
        this.scroll.scrollToElement(elem)
      }
```