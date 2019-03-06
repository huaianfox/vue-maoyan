## TAB布局结构
> tab页主要有home、cinema， profile,通过底部的tab导航栏切换，设置路由让这三个tab页在一个[layout布局](vue-maoyan/layout?id=layout路由设置)中使用，公用一个[Tabbar组件](vue-maoyan/layout?id=Tabbar组件)

- [主页](vue-maoyan/home) HOME页
- [影院](vue-maoyan/cinema) Cinema页
- [个人中心](vue-maoyan/profile) Profile页


```html
<template>
  <div class="pages">
    <router-view />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/tabbar'
export default {
  name: 'Main',
  components: {
    Tabbar
  }
}
</script>

```
## layout路由设置
> 应用初始化 Layout组件，[Home组件](vue-maoyan/home)，[Hot组件](vue-maoyan/hot)同步加载，其他组件都是异步加载,后续权限控制等待扩展

```js
/**
 *  router @addr src\router\routes.js
 *  
 *  @_import 异步加载组件函数
*/
import Layout from '@/pages/layout'
import Home from '@/pages/home'
import Hot from '@/pages/home/children/hot'

const _import = (file) => () => {
  let path = /(.*).\/(.+?)/.test(file) ? file : `${file}/index`
  return import(`@/pages/${path}.vue`)
}

const home = {
  path: '/',
  component: Home,
  children: [
    {
      path: '/',
      component: Hot
    },
    {
      path: '/release',
      component: _import('home/children/release')
    }
  ]
}

const cinema = {
  path: '/cinema',
  component: _import('cinema')
}

const profile = {
  path: '/profile',
  component: _import('profile'),
  hidden: true
}

const layout = {
  path: '/',
  component: Layout,
  children: [
    home,
    cinema,
    profile
  ]
}

```

## Tabbar组件
> Tabbar组件主要控制tab的切换和显示当前页面激活的的标识，在配置文件中定义tab页的相关信息

```html
/**
 ***@addr src\components\tabbar\index.vue
*/
<template>
  <footer class='nav-wrapper'>
    <router-link class='nav-icon-wrapper'
                 v-for="tab in tabs"
                 :key="tab.icon"
                 :to="tab.path"
                 :class="{active : $route.path ===  tab.path || $route.path === tab.alias}"
                 exact>
      <div :class='"nav-icon iconfont icon-" +tab.icon'>
      </div>
      <div class="nav-text">{{tab.title}}</div>
    </router-link>
  </footer>
</template>

<script>
import tabs from '@/config/tab'
export default {
  name: 'Tabbar',
  data () {
    return {
      tabs: [...tabs]
    }
  }
}
</script>
```

### Tabbar组件逻辑
> 通过比对当前路由地址和tab设置中的path和alias属性来确定页面的状态
```html
<router-link
  v-for="tab in tabs"
  :key="tab.icon"
  :to="tab.path"
  exact
  :class="{active : $route.path ===  tab.path || $route.path === tab.alias}" />
```

```js
import tabs from '@/config/tab'
/**
 *  @add src\config\tab.js
 **/
export default [
  {
    path: '/',
    alias: '/release',
    title: '电影',
    icon: 'movie'
  },
  {
    path: '/cinema',
    title: '影院',
    icon: 'cinema'
  },
  {
    path: '/profile',
    title: '我的',
    icon: 'profile'
  }
]
```

