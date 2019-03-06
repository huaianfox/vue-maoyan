## 首页架构预览
-  主页分两个子页面，正在热映（hot）和即将上映页面，HOME主页默认显示正在热映（hot）页面
  - [正在热映HOT页面](vue-maoyan/hot)
  - [即将上映页面](vue-maoyan/release)

```html
/**
*****@addr src\pages\home\index.vue
**/
<template>
  <section class="panel">
    <NavBar title="猫眼电影" />
    <TopBar class="top" />
    <router-view></router-view>
  </section>
</template>

<script>
import NavBar from '@/components/navbar/fixed'
import TopBar from './components/top'

export default {
  name: 'Home',
  components: {
    NavBar,
    TopBar
  }
}
</script>
//...css略
```
## Navbar组件
这里引入了NavBar固定组件（src\components\navbar\fixed.vue），因为Tab页的顶部导航都是固定在顶部不随页面滚动，NavBar-fixed组件复用了通用NavBar（src\components\navbar\index.vue）组件
### Navbar基础组件
```html
// 通用Navbar组件 (src\components\navbar\index.vue)
<template>
  <header
    class="navbar"
    :class="{back: back, 'navbar-fiexd': fixed}"
  >
    <a
      v-if="back"
      @click="goback"
      href="javascript:void(0);"
      class="iconfont icon-back"
    ></a>
    <h1 class="navbar-title ellipsis">{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goback () {
      this.$router.back()
    }
  }
}
</script>
//...css略
```
### Navbar固定组件
```html
// Navbar固定组件 (src\components\navbar\fixed.vue)
<template>
  <Navbar :back="back"
          :fixed="fixed"
          :title="title"></Navbar>
</template>

<script >
import Navbar from './index'
export default {
  name: 'NavbarFixed',
  data () {
    return {
      back: false,
      fixed: true
    }
  },
  props: {
    title: {
      type: String
    }
  },
  components: {
    Navbar
  }
}
</script>
//...css略
```

## Topbar 组件
这里引入了Topbar组件（src\pages\home\components\top.vue），因为Home主页和影院页的顶部帮助栏基本结构一致，此处的Topbar组件复用了通用Topbar（src\components\Topbar\index.vue）组件
### 通用Topbar组件
```html
// 通用Topbar,帮助栏固定有一个城市页面入口，显示当前城市 src\components\Topbar\index.vue
<template>
  <header
    class="topbar"
    :style="styles"
  >
    <router-link
      to="city-list"
      class="city-entry"
    >
      {{city.nm}}
    </router-link>
    <slot></slot>
    <slot name="search"></slot>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Topbar',
  props: {
    styles: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapState(['city'])
  }
}
</script>
```
### HOME主页Topbar组件
```html
// src\pages\home\components\top.vue
// 增加切换hot和release页面的路径
// 增加搜索页面的入口
<template>
  <BaseTopBar>
    <div class="movie-switch">
      <div
        class="hot-item"
        v-for="(item,index) in tabs"
        :key="item.title"
        :class="item.path===$route.path? 'active': ''"
        @click="switchMoviePanel(item, index)"
      >{{item.title}}</div>
    </div>
    <router-link
      :to="{name: 'search', params: {searchType: 'movie'}}"
      solt="search"
      class="movie-search iconfont icon-search"
    ></router-link>
  </BaseTopBar>
</template>

<script >
import BaseTopBar from '@/components/topbar/base'

export default {
  data () {
    return {
      tabs: [
        {
          path: '/',
          title: '正在上映'
        },
        {
          path: '/release',
          title: '即将上映'
        }
      ]
    }
  },
  methods: {
    switchMoviePanel (item) {
      this.$router.push(item.path)
    }
  },
  components: {
    BaseTopBar
  }
}
</script>
```
