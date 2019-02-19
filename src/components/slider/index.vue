<template>
  <section :class="cname">
    <swiper>
      <swiper-slide v-for="item in items" :key="item.img">
        <slot></slot>
        {{item.img}}
      </swiper-slide>
      <div class="swiper-pagination" v-if="options.pagination" slot="pagination"/>
    </swiper>
  </section>
</template>

<script >
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {};
  },
  components: {
    swiper,
    swiperSlide
  },
  props: {
    cname: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default() {
        return {
          autoplay: true,
          loop: true,
          pagination: {
            el: ".swiper-pagination"
          },
          notNextTick: false
        };
      }
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="css">
@import "~swiper/dist/css/swiper.css";
</style>
