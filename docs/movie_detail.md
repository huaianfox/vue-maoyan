## 电影详情页面架构预览
 @addr src\pages\movie\index.vue

 原页面是服务端渲染，此页面没有api接口，使用了[电影-影院的api接口](vue-maoyan/cinema_movie?id=获取电影详情信息接口)的部分数据

-  NavBar组件使用[Navbar基础组件](vue-maoyan/home?id=navbar基础组件)
-  [CommonFooter组件](vue-maoyan/movie_detail?id=CommonFooter组件)  
-  [Descp组件](vue-maoyan/movie_detail?id=Descp组件)

> 页面初始从vuex获取历史搜索记录，从不同的路径来源进入搜索页面显示不同的历史记录，请求的参数也不同

```html
<template>
  <div class="page">
    <Navbar :title="detail.nm" />
    <MovieDetail :detail="detail"
                 :link="link">
      <i slot="video"
         class="iconfont icon-play"></i>
    </MovieDetail>
    <Descp :detail="detail" />
    <section class="media">
      <h3>媒体库</h3>
      <ul class="movie-stages">
        <li class="movie-item video">
          <img class="img"
               v-lazy="media.video"
               alt="">
          <i class="iconfont icon-play"></i>
        </li>
        <li class="movie-item"
            v-for="item in media.photos"
            :key="item">
          <img class="img"
               v-lazy="item"
               alt="">
        </li>
      </ul>
    </section>
    <common-footer />
  </div>
</template>

<script >
import MovieDetail from '@/components/movieDetail'
import Navbar from '@/components/navbar'
import CommonFooter from '@/components/common-footer'
import { getMovieDetail } from '@/api'
import Descp from './components/desc'

export default {
  data () {
    return {
      detail: {},
      link: false
    }
  },
  computed: {
    media () {
      let media = {}
      const p = this.detail.photos || []
      const video = this.detail.videoImg
      media.photos = p.map(item => item.replace('w.h', '180.140'))
      media.video = video
      return media
    }
  },
  created () {
    const movieId = +this.$route.params.id
    getMovieDetail({ params: { movieId } }).then(data => {
      this.detail = data.detailMovie
    })
  },
  components: {
    Navbar,
    MovieDetail,
    Descp,
    CommonFooter
  }
}
</script>
```

## CommonFooter组件

公共组件
```html
/**
* @addr src\components\common-footer\index.vue
**/
<template>
  <footer class="footer">
    <div class="copyright">
      <span>© 猫眼电影 客服电话: <a href="tel:10105335">1010-5335</a></span>
    </div>
    <p class="icp">
      <span>京ICP备16022489号-1</span>
      <span>京公网安备11010502030881号</span>
    </p>
    <p class="comp">
      北京猫眼文化传媒有限公司
    </p>
  </footer>
</template>

<script >
export default {
  name: 'FooterCopy'
}
</script>
```

## Descp组件

```html
/**
* @addr src\pages\movie\components\desc\index.vue
**/
<template>
  <div class="desc">
    <router-link class="buy-link"
                 :to="'/cinema/movie/'+ detail.id">特惠购票</router-link>
    <div class="text"
         :class="{'text-ellipsis': shrink}">{{detail.dra}}</div>
    <div @click="shrink=!shrink"
         class="text-expander-button iconfont icon-back"
         :class="{down: shrink}"></div>
  </div>
</template>

<script >
export default {
  data () {
    return {
      shrink: true
    }
  },
  props: {
    detail: Object
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>
```