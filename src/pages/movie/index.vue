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
        <li class="movie-item video"
            @click="handlePlay">
          <img class="img"
               v-lazy="detail.videoImg"
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
    <div class="video-wrapper"
         v-if="play">
      <div class="masker"
           @click="handlePlay"></div>
      <div class="video">
        <video :src="detail.vd"
               autoplay
               controls>
        </video>
      </div>
    </div>
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
      link: false,
      play: false
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
  methods: {
    handlePlay () {
      this.play = !this.play
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
.video-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .masker {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .video {
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    padding-top: 56.25%;
    height: 0;
    z-index: 999;
    video {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
