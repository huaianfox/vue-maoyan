<template>
  <div class="page">
    <Navbar :title="detail.nm" />
    <MovieDetail :detail="detail"
                 :link="link">
                 <i slot="video" class="iconfont icon-play"></i>
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
import Descp from './desc'

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

<style scoped lang="scss">
.page {
  min-height: 100%;
  background: #f4f4f4;
}
.media {
  margin: 10px 0;
  padding-bottom: 10px;
  border-top: 1px solid #e5e5e5;
  background: #fff;
  h3 {
    margin: 0;
    padding: 10px 15px;
    color: #666;
    font-size: 16px;
  }
  .movie-stages {
    padding-left: 15px;
    margin: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
    .movie-item {
      position: relative;
      list-style: none;
      display: inline-block;
      overflow: hidden;
      width: 90px;
      height: 70px;
      margin-left: 5px;
      &.video {
        width: 127px;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.icon-play {
  position: absolute;
  padding: 5px;
  bottom: 0;
  right: 0;
  font-size: 28px;
  color: #dccece;
}
</style>
