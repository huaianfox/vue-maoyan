<template>
  <section class="cinema-nav">
    <div class="post-bg" :style="{background: backgroundImg}"></div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in list" :key="item.img">
        <div class="poster">
          <img :src="item.img" alt>
        </div>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"/> -->
    </swiper>
  </section>
</template>

<script >
// import Slider from "@/components/slider";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      backgroundImg:
        "url(//p0.meituan.net/148.208/movie/caa49433185fd62b4384e3ad195ec1541309089.jpg)",
      currentIndex: 0,
      swiperOption: {
        delay: 2500,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        notNextTick: false,
        slidesPerView: 4,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 3,
        on: {
          slideChangeTransitionStart() {
            this.currentIndex = this.realIndex;
          }
        }
      },
      list: [
        {
          desc: "128分钟 | 剧情 | 吴京,屈楚萧,李光洁",
          dur: 128,
          globalReleased: true,
          id: 248906,
          img:
            "//p1.meituan.net/148.208/movie/616cd50a33550a9225ac781e52d14ae54967551.jpg",
          nm: "流浪地球",
          preferential: 0,
          sc: "9.3",
          showCount: 37
        },
        {
          desc: "128分钟 | 剧情 | 吴京,屈楚萧,李光洁",
          dur: 128,
          globalReleased: true,
          id: 24890236,
          img:
            "//p0.meituan.net/148.208/movie/caa49433185fd62b4384e3ad195ec1541309089.jpg",
          nm: "流浪地球",
          preferential: 0,
          sc: "9.3",
          showCount: 37
        }
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    currentIndex() {
      console.log(this.currentIndex);
      this.backgroundImg = `url(${this.list[this.currentIndex].img})`;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~swiper/dist/css/swiper.css";
.cinema-nav {
  padding: 20px 15px 20px 5px;
  overflow: hidden;
  transform: translateZ(0);
  .post-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
    -webkit-filter: blur(30px);
    filter: blur(30px);
    background-position-y: 40%;
  }

  .poster {
    padding-bottom: 4px;
    width: 65px;
    transition: transform 0.3s;
    position: relative;
    // overflow: hidden;
    img {
      width: 100%;
      height: 95px;
      transform: scale(1);
    }
  }
  .swiper-slide-active {
    .poster {
      transform: scale(1.1);
      border: 2px solid #fff;
      &:after {
        content: "";
        position: absolute;
        bottom: -6px;
        left: 50%;
        border: 3px solid transparent;
        border-top: #fff;
      }
    }
  }
}
</style>
