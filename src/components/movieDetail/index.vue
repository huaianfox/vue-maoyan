<template>
  <div class="movie-detail">
    <div class="cover"
         :style="cover"></div>
    <div class="detail">
      <div class="poster">
        <img :src="poster"
             alt />
        <slot name="video" />
      </div>
      <div class="content">
        <div class="title ellipsis">{{detail.nm}}</div>
        <div class="p1 ellipsis">{{detail.enm}}</div>
        <div class="score ellipsis p1">
          <slot name="movie-score" />
          <span class="p1" v-if="detail.globalReleased">（{{num}}万人评）</span>
          <span v-if="!detail.globalReleased">{{detail.snum}}人想看</span>
        </div>
        <div class="p1 ellipsis">{{detail.cat}}</div>
        <div class="p1 ellipsis">{{detail.src}}</div>
        <div class="p1 ellipsis">{{detail.pubDesc}}</div>
      </div>
      <router-link v-if="link"
                   :to="'/movie/'+ detail.id"
                   class="arrow-right">
        <i class="iconfont icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script >
import { setSize } from '@/util'

export default {
  data () {
    return {
      scores: [],
      fullStar: '//s0.meituan.net/bs/?f=react-canary:/img/star-full-new.png',
      half: '//s0.meituan.net/bs/?f=react-canary:/img/star-half-new.png',
      white: '//s0.meituan.net/bs/?f=react-canary:/img/star-empty-new.png'
    }
  },
  props: {
    detail: {
      type: Object,
      default () {
        return {}
      }
    },
    link: {
      type: Boolean,
      default: true
    }
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
      return parseInt(this.detail.snum / 10000)
    },
    stars () {
      const sc = parseInt(this.detail.sc)
      const end = sc - this.detail.sc > 0.5 ? 1 : 0
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
  },
  methods: {
    setSize (size) {
      return setSize(this.detail.img || '')(size)
    }
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
    z-index: -1;
    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: #333;
      opacity: 0.6;
    }
  }
  .detail {
    display: flex;
    align-items: center;
    height: 100%;
    height: 150px;
    padding: 19px 10px 19px 15px;
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
    align-items: center;
    justify-content: center;
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
    }
    .score {
      font-size: 18px;
      font-weight: 700;
      color: #fc0;
      margin-top: 11px;
    }
    .stars {
      .num {
        padding-left: 8px;
        padding-bottom: 5px;
        font-size: 16px;
      }
    }
  }
  .arrow-right {
    display: block;
    width: 40px;
    height: 100px;
    color: #fff;
    line-height: 100px;
    text-align: center;
  }
}
</style>
