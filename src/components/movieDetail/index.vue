<template>
  <div class="movie-detail"
       v-if="loaded">
    <div class="cover"
         :style="cover"></div>
    <div class="detail">
      <div class="poster">
        <router-link tag="div"
                     class="movie-preview"
                     v-if="show"
                     :to="'/movie/'+ detailMovie.id + '/preview'" />
        </router-link>
        <img :src="poster"
             alt />
      </div>
      <div class="content">
        <div class="title ellipsis">{{detailMovie.nm}}</div>
        <div class="p1 ellipsis">{{detailMovie.enm}}</div>
        <div class="score ellipsis p1">
          <span :class="{stars:show}">
            <span v-if="show">
              <img v-for="(star, key) in stars"
                   :key="key"
                   :src="star"
                   alt="">
            </span>
            <span class="num">{{detailMovie.sc}}</span>
          </span>
          <span class="p1">（{{num}}万人评）</span>
        </div>
        <div class="p1 ellipsis">{{detailMovie.cat}}</div>
        <div class="p1 ellipsis">{{detailMovie.src}}</div>
        <div class="p1 ellipsis">{{detailMovie.pubDesc}}</div>
      </div>
      <router-link v-if="!show"
                   :to="'/movie/'+ detailMovie.id"
                   class="iconfont icon-arrow-right" />
    </div>
  </div>
</template>

<script >
import { setSize } from '@/util'
import { getMovieDetail } from '@/api'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      show: false,
      loaded: false,
      detailMovie: {},
      scores: [],
      fullStar: '//s0.meituan.net/bs/?f=react-canary:/img/star-full-new.png',
      half: '//s0.meituan.net/bs/?f=react-canary:/img/star-half-new.png',
      white: '//s0.meituan.net/bs/?f=react-canary:/img/star-empty-new.png'
    }
  },
  props: {
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
      return parseInt(this.detailMovie.snum / 10000)
    },
    stars () {
      const sc = parseInt(this.detailMovie.sc)
      const end = sc - this.detailMovie.sc > 0.5 ? 1 : 0
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
    console.log(this.$route.name)
  },
  activated () {
    const movieId = this.$route.params.id
    getMovieDetail({ params: { movieId } }).then(data => {
      this.detailMovie = data.detailMovie
      this.updateDetailMovie(this.detailMovie)
      this.loaded = true
      this.$store.commit('changePageTitle', this.detailMovie.nm)
    })
  },
  methods: {
    setSize (size) {
      return setSize(this.detailMovie.img || '')(size)
    },
    ...mapMutations(['updateDetailMovie'])
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/fn.scss';
.movie-detail {
  position: relative;
  height: 188px;
  z-index: 999;
  cursor: pointer;
  overflow: hidden;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(1.1rem);
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.55;
    z-index: -1;
    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: #333;
    }
  }
  .detail {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    height: 150px;
    padding: 19px 0 19px 15px;
    .poster {
      position: relative;
      width: 110px;
      height: 150px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .movie-preview {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    filter: blur(0);
    font-style: initial;
    -webkit-filter: blur(0);
    border: 1px solid #f0f2f3;
    background: rgba(255, 255, 255, 0.1);
    &:after {
      content: '播';
      color: #fff;
      right: 0.1rem;
      bottom: 0.1rem;
      font-size: 0.5rem;
      position: absolute;
      font-family: myfont;
      width: 0.5rem;
      height: 0.5rem;
      line-height: 0.5rem;
      border-radius: 100%;
      opacity: 0.7;
      background: #333;
    }
  }
  .content {
    flex: 1;
    overflow-x: hidden;
    margin-left: 12.5px;
    line-height: 1;
    color: #fff;

    .title {
      font-size: 20px;
      margin-top: 2px;
      font-weight: 700;
      overflow: hidden;
    }
    .p1 {
      margin-top: 5px;
      font-size: 12px;
      color: #fff;
      opacity: 0.8;
    }
    .score {
      font-size: 18px;
      font-weight: 700;
      color: #fc0;
      margin-top: 11px;
    }
    .stars {
      display: block;
      .num {
        padding-left: 5px;
        padding-bottom: 5px;
        font-size: 16px;
      }
    }
  }
  .icon-arrow-right {
    display: block;
    width: 60px;
    color: #fff;
    text-align: center;
  }
}
</style>
