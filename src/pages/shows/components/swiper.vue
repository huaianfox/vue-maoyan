<template>
  <section class="swipe-wrapper">
    <section class="cinema-nav">
      <div class="post-bg"
           :style="{background: backgroundImg}"></div>
      <swiper ref="cinemaSwiper"
              :options="swiperOption">
        <swiper-slide v-for="(item, index) in list"
                      :key="item.img">
          <div class="poster"
               :class="{active: currentIndex === index}">
            <img :src="item.img| formatImg"
                 alt>
          </div>
        </swiper-slide>
      </swiper>
    </section>
    <div class="movie-info">
      <header class="movie-title">
        <span class="title">{{info.nm}}</span>
        <span class="grade">
          <em>{{tips.num}}</em>
          {{tips.name}}
        </span>
      </header>
      <p class="movie-desc">{{info.desc}}</p>
    </div>
    <Seat :info="info">
      <Discount slot="vip-tips"
                v-if="vip.tag"
                :info="vip" />
    </Seat>
  </section>
</template>

<script >
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Seat from './seat'
import Discount from './discount'
import { getImg } from '@/util'
export default {
  data () {
    return {
      currentIndex: 0,
      swiperOption: {
        delay: 2500,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slideToClickedSlide: true,
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 5
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.cinemaSwiper
    },
    backgroundImg () {
      const list = this.list[this.currentIndex] ? this.list[this.currentIndex] : {}
      const img = list.img ? list.img.replace('w.h', '140.208') : ''
      return `url(${img})`
    },
    info () {
      return this.list[this.currentIndex] || {}
    },
    tips () {
      const info = this.info
      if (info.sc === '0.0') {
        return {
          num: info.wish,
          name: '人想看'
        }
      }
      return {
        num: info.sc,
        name: '分'
      }
    }
  },
  props: {
    list: Array,
    vip: Object
  },
  filters: {
    formatImg (value) {
      if (!value) return ''
      return getImg('92.92')(value)
    }
  },
  components: {
    swiper,
    swiperSlide,
    Seat,
    Discount
  },
  created () {
    this.$nextTick(() => {
      const vm = this
      this.swiper.$on('slideChangeTransitionStart', function () {
        vm.currentIndex = this.swiper.realIndex
      })
    })
  }
}
</script>

<style scoped lang="scss">
@import '~swiper/dist/css/swiper.css';
.cinema-nav {
  padding: 30px 15px 30px 5px;
  transform: translateZ(0);
  overflow: hidden;
  .post-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    -webkit-filter: blur(30px);
    filter: blur(30px);
    background-position-y: 40%;
  }

  .poster {
    padding-bottom: 4px;
    width: 65px;
    transition: transform 0.3s;
    position: relative;
    img {
      width: 100%;
      height: 96px;
      transform: scale(1);
      vertical-align: middle;
    }
  }
  .swiper-container {
    overflow: visible;
  }
  .swiper-slide {
    width: 65px;
    height: 94px;
  }
  .active {
    position: relative;
    width: 65px;
    height: 94px;
    border: 2px solid #fff;
    transform: scale(1.1);
    &:after {
      width: 0;
      height: 0;
      content: '';
      position: absolute;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      bottom: -11px;
      z-index: 100;
      border: 5px solid transparent;
      border-top: 5px solid #fff;
    }
  }
}
.movie-info {
  padding: 11px 15px;
  background: #fff;
  text-align: center;
  .movie-title {
    height: 24px;
    line-height: 24px;
    font-size: 17px;
    color: #333;
    font-weight: 700;
  }
  .title {
    line-height: 24px;
    font-size: 17px;
    color: #333;
    font-weight: 700;
  }
  .grade {
    padding-left: 5px;
    color: #ffb400;
    font-size: 14px;
    em {
      font-style: normal;
      font-size: 16px;
    }
  }
  .movie-desc {
    margin-top: 2px;
    height: 18.5px;
    line-height: 18.5px;
    font-size: 13px;
    color: #999;
  }
}
</style>
